import { OwnerType } from "@artsy/cohesion"
import { Artwork_artworkAboveTheFold } from "__generated__/Artwork_artworkAboveTheFold.graphql"
import { Artwork_artworkBelowTheFold } from "__generated__/Artwork_artworkBelowTheFold.graphql"
import { Artwork_me } from "__generated__/Artwork_me.graphql"
import { ArtworkAboveTheFoldQuery } from "__generated__/ArtworkAboveTheFoldQuery.graphql"
import { ArtworkBelowTheFoldQuery } from "__generated__/ArtworkBelowTheFoldQuery.graphql"
import { ArtworkMarkAsRecentlyViewedQuery } from "__generated__/ArtworkMarkAsRecentlyViewedQuery.graphql"
import { RetryErrorBoundary } from "lib/Components/RetryErrorBoundary"
import { navigationEvents } from "lib/navigation/navigate"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { ArtistSeriesMoreSeriesFragmentContainer as ArtistSeriesMoreSeries } from "lib/Scenes/ArtistSeries/ArtistSeriesMoreSeries"
import { useFeatureFlag } from "lib/store/GlobalStore"
import { AboveTheFoldQueryRenderer } from "lib/utils/AboveTheFoldQueryRenderer"
import { isPad } from "lib/utils/hardware"
import {
  PlaceholderBox,
  PlaceholderRaggedText,
  PlaceholderText,
  ProvidePlaceholderContext,
} from "lib/utils/placeholders"
import { QAInfoPanel } from "lib/utils/QAInfo"
import { ProvideScreenTracking, Schema } from "lib/utils/track"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { Box, Flex, Separator, Spacer, useSpace } from "palette"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { RefreshControl } from "react-native"
import { commitMutation, createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { TrackingProp } from "react-tracking"
import usePrevious from "react-use/lib/usePrevious"
import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment"
import { AboutArtistFragmentContainer as AboutArtist } from "./Components/AboutArtist"
import { AboutWorkFragmentContainer as AboutWork } from "./Components/AboutWork"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkHeaderFragmentContainer as ArtworkHeader } from "./Components/ArtworkHeader"
import { ArtworkHistoryFragmentContainer as ArtworkHistory } from "./Components/ArtworkHistory"
import { ArtworksInSeriesRailFragmentContainer as ArtworksInSeriesRail } from "./Components/ArtworksInSeriesRail"
import { CommercialInformationFragmentContainer as CommercialInformation } from "./Components/CommercialInformation"
import { ContextCardFragmentContainer as ContextCard } from "./Components/ContextCard"
import { getMeasurements } from "./Components/ImageCarousel/geometry"
import { OtherWorksFragmentContainer as OtherWorks, populatedGrids } from "./Components/OtherWorks/OtherWorks"
import { PartnerCardFragmentContainer as PartnerCard } from "./Components/PartnerCard"

interface ArtworkProps {
  artworkAboveTheFold: Artwork_artworkAboveTheFold | null
  artworkBelowTheFold: Artwork_artworkBelowTheFold | null
  me: Artwork_me | null
  isVisible: boolean
  relay: RelayRefetchProp
  tracking?: TrackingProp
}

export const Artwork: React.FC<ArtworkProps> = ({
  artworkAboveTheFold,
  artworkBelowTheFold,
  isVisible,
  me,
  relay,
  tracking,
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  const artistSerieasEnabled = useFeatureFlag("AROptionsArtistSeries")
  const artistSeriesEnabled = useFeatureFlag("AROptionsArtistSeries")

  const { internalID, slug } = artworkAboveTheFold || {}
  const {
    category,
    canRequestLotConditionsReport,
    conditionDescription,
    signature,
    signatureInfo,
    certificateOfAuthenticity,
    framed,
    series,
    publisher,
    manufacturer,
    imageRights,
    partner,
    sale,
    contextGrids,
    artistSeriesConnection,
    artist,
    context,
  } = artworkBelowTheFold || {}

  const shouldRenderDetails = () => {
    return !!(
      category ||
      canRequestLotConditionsReport ||
      conditionDescription ||
      signature ||
      signatureInfo ||
      certificateOfAuthenticity ||
      framed ||
      series ||
      publisher ||
      manufacturer ||
      imageRights
    )
  }

  const shouldRenderPartner = () => {
    if ((sale && sale.isBenefit) || (sale && sale.isGalleryAuction)) {
      return false
    } else if (partner && partner.type && partner.type !== "Auction House") {
      return true
    } else {
      return false
    }
  }

  const shouldRenderOtherWorks = () => {
    const gridsToShow = populatedGrids(contextGrids)

    if (gridsToShow && gridsToShow.length > 0) {
      return true
    } else {
      return false
    }
  }

  const shouldRenderArtworksInArtistSeries = () => {
    const artistSeries = artistSeriesConnection?.edges?.[0]
    const numArtistSeriesArtworks = artistSeries?.node?.filterArtworksConnection?.edges?.length ?? 0
    return artistSerieasEnabled && numArtistSeriesArtworks > 0
  }

  const shouldRenderArtistSeriesMoreSeries = () => {
    return artistSeriesEnabled && (artist?.artistSeriesConnection?.totalCount ?? 0) > 0
  }

  useEffect(() => {
    markArtworkAsRecentlyViewed()
    navigationEvents.addListener("modalDismissed", handleModalDismissed)

    return () => {
      navigationEvents.removeListener("modalDismissed", handleModalDismissed)
    }
  }, [])

  // This is a hack to make useEffect behave exactly like didComponentUpdate.
  const firstUpdate = useRef(true)
  const previousIsVisible = usePrevious(isVisible)

  useLayoutEffect(() => {
    if (!isVisible || previousIsVisible) {
      return
    }

    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    refetch(markArtworkAsRecentlyViewed)
  })

  const onRefresh = (cb?: () => any) => {
    if (refreshing) {
      return
    }

    setRefreshing(true)

    relay.refetch(
      { artistID: internalID },
      null,
      () => {
        setRefreshing(false)
        cb?.()
      },
      {
        force: true,
      }
    )
  }

  const refetch = (cb?: () => any) => {
    relay.refetch(
      { artistID: internalID },
      null,
      () => {
        cb?.()
      },
      { force: true }
    )
  }

  const handleModalDismissed = () => {
    setFetchingData(true)
    refetch(() => setFetchingData(false))
    return true
  }

  const markArtworkAsRecentlyViewed = () => {
    commitMutation<ArtworkMarkAsRecentlyViewedQuery>(relay.environment, {
      mutation: graphql`
        mutation ArtworkMarkAsRecentlyViewedQuery($input: RecordArtworkViewInput!) {
          recordArtworkView(input: $input) {
            artworkId
          }
        }
      `,
      variables: {
        input: {
          artwork_id: slug || "",
        },
      },
    })
  }

  const sectionsData = (): ArtworkPageSection[] => {
    const sections: ArtworkPageSection[] = []

    if (artworkAboveTheFold && me) {
      sections.push({
        key: "header",
        element: <ArtworkHeader artwork={artworkAboveTheFold} />,
        excludePadding: true,
      })

      sections.push({
        key: "commercialInformation",
        element: <CommercialInformation artwork={artworkAboveTheFold} me={me} tracking={tracking} />,
      })
    }

    if (!artworkBelowTheFold) {
      sections.push({
        key: "belowTheFoldPlaceholder",
        element: <BelowTheFoldPlaceholder />,
      })
      return sections
    }

    if (artworkBelowTheFold.description || artworkBelowTheFold.additionalInformation) {
      sections.push({
        key: "aboutWork",
        element: <AboutWork artwork={artworkBelowTheFold} />,
      })
    }

    if (shouldRenderDetails()) {
      sections.push({
        key: "artworkDetails",
        element: <ArtworkDetails artwork={artworkBelowTheFold} />,
      })
    }

    if (artworkBelowTheFold.provenance || artworkBelowTheFold.exhibitionHistory || artworkBelowTheFold.literature) {
      sections.push({
        key: "history",
        element: <ArtworkHistory artwork={artworkBelowTheFold} />,
      })
    }

    if (artist && artist.biographyBlurb) {
      sections.push({
        key: "aboutArtist",
        element: <AboutArtist artwork={artworkBelowTheFold} />,
      })
    }

    if (shouldRenderPartner()) {
      sections.push({
        key: "partnerCard",
        element: <PartnerCard artwork={artworkBelowTheFold} />,
      })
    }

    if (context && context.__typename === "Sale" && context.isAuction) {
      sections.push({
        key: "contextCard",
        element: <ContextCard artwork={artworkBelowTheFold} />,
      })
    }

    if (shouldRenderArtworksInArtistSeries()) {
      sections.push({
        key: "artworksInSeriesRail",
        element: <ArtworksInSeriesRail artwork={artworkBelowTheFold} />,
      })
    }

    if (artworkAboveTheFold && shouldRenderArtistSeriesMoreSeries()) {
      sections.push({
        key: "artistSeriesMoreSeries",
        element: (
          <ArtistSeriesMoreSeries
            contextScreenOwnerId={artworkAboveTheFold.internalID}
            contextScreenOwnerSlug={artworkAboveTheFold.slug}
            contextScreenOwnerType={OwnerType.artwork}
            artist={artist}
            artistSeriesHeader="Series from this artist"
          />
        ),
      })
    }

    if (shouldRenderOtherWorks()) {
      sections.push({
        key: "otherWorks",
        element: <OtherWorks artwork={artworkBelowTheFold} />,
      })
    }

    return sections
  }

  const QAInfo = () => (
    <QAInfoPanel
      style={{ position: "absolute", top: 200, left: 10, backgroundColor: "grey" }}
      info={[["id", internalID || ""]]}
    />
  )

  return (
    <ProvideScreenTracking
      info={{
        context_screen: Schema.PageNames.ArtworkPage,
        context_screen_owner_type: Schema.OwnerEntityTypes.Artwork,
        context_screen_owner_slug: slug,
        context_screen_owner_id: internalID,
      }}
    >
      {fetchingData ? (
        <ProvidePlaceholderContext>
          <AboveTheFoldPlaceholder />
        </ProvidePlaceholderContext>
      ) : (
        <FlatList<ArtworkPageSection>
          keyboardShouldPersistTaps="handled"
          data={sectionsData()}
          ItemSeparatorComponent={() => (
            <Box mx={2} my={3}>
              <Separator />
            </Box>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (item.excludePadding ? item.element : <Box px={2}>{item.element}</Box>)}
        />
      )}
      <QAInfo />
    </ProvideScreenTracking>
  )
}

interface ArtworkPageSection {
  key: string
  element: JSX.Element
  excludePadding?: boolean
}

export const ArtworkContainer = createRefetchContainer(
  Artwork,
  {
    artworkAboveTheFold: graphql`
      fragment Artwork_artworkAboveTheFold on Artwork {
        ...ArtworkHeader_artwork
        ...CommercialInformation_artwork
        slug
        internalID
        id
        isAcquireable
        isOfferable
        isBiddable
        isInquireable
        availability
      }
    `,
    artworkBelowTheFold: graphql`
      fragment Artwork_artworkBelowTheFold on Artwork {
        additionalInformation
        description
        provenance
        exhibitionHistory
        literature
        partner {
          type
          id
        }
        artist {
          biographyBlurb {
            text
          }
          artistSeriesConnection(first: 4) {
            totalCount
          }
          ...ArtistSeriesMoreSeries_artist
        }
        sale {
          id
          isBenefit
          isGalleryAuction
        }
        category
        canRequestLotConditionsReport
        conditionDescription {
          details
        }
        signature
        signatureInfo {
          details
        }
        certificateOfAuthenticity {
          details
        }
        framed {
          details
        }
        series
        publisher
        manufacturer
        imageRights
        context {
          __typename
          ... on Sale {
            isAuction
          }
        }
        contextGrids {
          artworks: artworksConnection(first: 6) {
            edges {
              node {
                id
              }
            }
          }
        }
        artistSeriesConnection(first: 1) {
          edges {
            node {
              filterArtworksConnection(first: 20, input: { sort: "-decayed_merch" }) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
        ...PartnerCard_artwork
        ...AboutWork_artwork
        ...OtherWorks_artwork
        ...AboutArtist_artwork
        ...ArtworkDetails_artwork
        ...ContextCard_artwork
        ...ArtworkHistory_artwork
        ...ArtworksInSeriesRail_artwork
      }
    `,
    me: graphql`
      fragment Artwork_me on Me {
        ...CommercialInformation_me
      }
    `,
  },
  graphql`
    query ArtworkRefetchQuery($artworkID: String!) {
      artwork(id: $artworkID) {
        ...Artwork_artworkAboveTheFold
        ...Artwork_artworkBelowTheFold
      }
    }
  `
)

export const ArtworkScreenQuery = graphql`
  query ArtworkAboveTheFoldQuery($artworkID: String!) {
    artwork(id: $artworkID) {
      ...Artwork_artworkAboveTheFold
    }
    me {
      ...Artwork_me
    }
  }
`

export const ArtworkQueryRenderer: React.FC<{
  artworkID: string
  isVisible: boolean
  environment?: RelayModernEnvironment
  tracking?: TrackingProp
  image?: any
}> = ({ artworkID, environment, image, ...others }) => {
  return (
    <RetryErrorBoundary
      render={({ isRetry }) => {
        return (
          <AboveTheFoldQueryRenderer<ArtworkAboveTheFoldQuery, ArtworkBelowTheFoldQuery>
            environment={environment || defaultEnvironment}
            above={{
              query: ArtworkScreenQuery,
              variables: { artworkID },
            }}
            below={{
              query: graphql`
                query ArtworkBelowTheFoldQuery($artworkID: String!) {
                  artwork(id: $artworkID) {
                    ...Artwork_artworkBelowTheFold
                  }
                }
              `,
              variables: { artworkID },
            }}
            render={{
              renderPlaceholder: () => <AboveTheFoldPlaceholder image={image} />,
              renderComponent: ({ above, below }) => {
                return (
                  <ArtworkContainer
                    artworkAboveTheFold={above.artwork}
                    artworkBelowTheFold={below?.artwork ?? null}
                    me={above.me}
                    {...others}
                  />
                )
              },
            }}
            cacheConfig={{
              // Bypass Relay cache on retries.
              ...(isRetry && { force: true }),
            }}
          />
        )
      }}
    />
  )
}

const AboveTheFoldPlaceholder: React.FC<{ image?: any }> = ({ image }) => {
  const space = useSpace()
  const screenDimensions = useScreenDimensions()
  // The logic for artworkHeight comes from the zeplin spec https://zpl.io/25JLX0Q
  let imageWidth = (screenDimensions.width >= 375 ? 340 : 290) - space(1)
  let imageHeight = screenDimensions.width

  if (image) {
    const boundingBox = {
      width: screenDimensions.width,
      height: isPad() ? 460 : screenDimensions.width >= 375 ? 340 : 290,
    }
    const measurements = getMeasurements({ images: [image], boundingBox })

    imageHeight = measurements[0].height
    imageWidth = measurements[0].width
  }

  return (
    <Flex py={2}>
      {/* Artwork thumbnail */}
      <Flex mx="auto">
        <PlaceholderBox height={imageHeight} width={imageWidth} />
      </Flex>

      <Flex px={2} flex={1}>
        <Spacer mb={2} />
        {/* save/share buttons */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <PlaceholderText width={50} marginHorizontal={space(1)} />
          <PlaceholderText width={50} marginHorizontal={space(1)} />
          <PlaceholderText width={50} marginHorizontal={space(1)} />
        </View>
        <Spacer mb={2} />
        {/* Artist name */}
        <PlaceholderText width={100} />
        <Spacer mb={2} />
        {/* Artwork tombstone details */}
        <View style={{ width: 130 }}>
          <PlaceholderRaggedText numLines={4} />
        </View>
        <Spacer mb={3} />
        {/* more junk */}
        <Separator />
        <Spacer mb={3} />
        <PlaceholderRaggedText numLines={3} />
        <Spacer mb={2} />
        {/* commerce button */}
        <PlaceholderBox height={60} />
      </Flex>
    </Flex>
  )
}

const BelowTheFoldPlaceholder: React.FC<{}> = ({}) => {
  return (
    <ProvidePlaceholderContext>
      <Separator />
      <Spacer mb={3} />
      {/* About the artwork title */}
      <PlaceholderText width={60} />
      <Spacer mb={2} />
      {/* About the artwork copy */}
      <PlaceholderRaggedText numLines={4} />
      <Spacer mb={3} />
      <Separator />
      <Spacer mb={3} />
      <ActivityIndicator />
      <Spacer mb={3} />
    </ProvidePlaceholderContext>
  )
}
