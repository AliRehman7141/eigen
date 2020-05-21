import { Box, Flex, Sans, space, Spinner, Theme } from "@artsy/palette"
import { ViewingRoomArtworks_viewingRoom } from "__generated__/ViewingRoomArtworks_viewingRoom.graphql"
import { ViewingRoomArtworksRendererQuery } from "__generated__/ViewingRoomArtworksRendererQuery.graphql"
import { OpaqueImageView } from "lib/Components/OpaqueImageView/OpaqueImageView"
import { SwitchBoard } from "lib/NativeModules/SwitchBoard"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { renderWithLoadProgress } from "lib/utils/renderWithLoadProgress"
import { ProvideScreenTracking, Schema } from "lib/utils/track"
import { ProvideScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useMemo, useRef, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { createPaginationContainer, graphql, QueryRenderer, RelayPaginationProp } from "react-relay"
import { useTracking } from "react-tracking"

const PAGE_SIZE = 5
interface ViewingRoomArtworksProps {
  relay: RelayPaginationProp
  viewingRoom: ViewingRoomArtworks_viewingRoom
}

interface ArtworkSection {
  key: string
  content: JSX.Element
}

export const ViewingRoomArtworks: React.FC<ViewingRoomArtworksProps> = ({ viewingRoom, relay }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const navRef = useRef()
  const tracking = useTracking()
  const artworks = viewingRoom.artworksConnection! /* STRICTNESS_MIGRATION */.edges! /* STRICTNESS_MIGRATION */

  const sections: ArtworkSection[] = useMemo(() => {
    return artworks.map((artwork, index) => {
      const finalArtwork = artwork! /* STRICTNESS_MIGRATION */.node! /* STRICTNESS_MIGRATION */
      return {
        key: `${index}`,
        content: (
          <TouchableOpacity
            ref={navRef as any /* STRICTNESS_MIGRATION */}
            onPress={() => {
              tracking.trackEvent({
                ...tracks.context(viewingRoom.internalID, viewingRoom.slug),
                ...tracks.tappedArtworkGroup(finalArtwork.internalID, finalArtwork.slug),
              })
              SwitchBoard.presentNavigationViewController(
                navRef.current!,
                finalArtwork.href! /* STRICTNESS_MIGRATION */
              )
            }}
          >
            <OpaqueImageView
              imageURL={finalArtwork.image! /* STRICTNESS_MIGRATION */.url! /* STRICTNESS_MIGRATION */}
              aspectRatio={finalArtwork.image!.aspectRatio}
            />
            <Box mt="1" mb="2" mx="2">
              <Sans size="3t" weight="medium">
                {finalArtwork.artistNames}
              </Sans>
              <Sans size="3t" color="black60" key={index}>
                {finalArtwork.title}
              </Sans>
              <Sans size="3t" color="black60">
                {finalArtwork.saleMessage}
              </Sans>
            </Box>
          </TouchableOpacity>
        ),
      }
    })
  }, [artworks])

  return (
    <ProvideScreenTracking info={tracks.context(viewingRoom.internalID, viewingRoom.slug)}>
      <Theme>
        <ProvideScreenDimensions>
          <Flex style={{ flex: 1 }}>
            <Sans size="4" py={2} weight="medium" textAlign="center">
              Artworks
            </Sans>
            <FlatList
              data={sections}
              ItemSeparatorComponent={() => <Box px={2} mb={2} />}
              renderItem={({ item }) => <Box>{item.content}</Box>}
              onEndReached={() => {
                if (isLoadingMore || !relay.hasMore()) {
                  return
                }
                setIsLoadingMore(true)
                relay.loadMore(PAGE_SIZE, error => {
                  if (error) {
                    // FIXME: Handle error
                    console.error("ViewingRoomArtworks.tsx", error.message)
                  }
                  setIsLoadingMore(false)
                })
              }}
              refreshing={isLoadingMore}
              ListFooterComponent={() => (
                <Flex alignItems="center" justifyContent="center" height={space(6)}>
                  {isLoadingMore ? <Spinner /> : null}
                </Flex>
              )}
            />
          </Flex>
        </ProvideScreenDimensions>
      </Theme>
    </ProvideScreenTracking>
  )
}

export const tracks = {
  context: (viewingRoomID: string, viewingRoomSlug: string) => {
    return {
      context_screen: Schema.PageNames.ViewingRoomArtworks,
      context_screen_owner_type: Schema.OwnerEntityTypes.ViewingRoom,
      context_screen_owner_id: viewingRoomID,
      context_screen_owner_slug: viewingRoomSlug,
    }
  },
  tappedArtworkGroup: (artworkID: string, artworkSlug: string) => {
    return {
      action: Schema.ActionNames.TappedArtworkGroup,
      context_module: Schema.ContextModules.ArtworkGrid,
      destination_screen: Schema.PageNames.ArtworkPage,
      destination_screen_owner_type: Schema.OwnerEntityTypes.Artwork,
      destination_screen_owner_id: artworkID,
      destination_screen_owner_slug: artworkSlug,
    }
  },
}

export const ViewingRoomArtworksContainer = createPaginationContainer(
  ViewingRoomArtworks,
  {
    viewingRoom: graphql`
      fragment ViewingRoomArtworks_viewingRoom on ViewingRoom
        @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String", defaultValue: "" }) {
        internalID
        slug
        artworksConnection(first: $count, after: $cursor) @connection(key: "ViewingRoomArtworks_artworksConnection") {
          edges {
            node {
              href
              slug
              internalID
              artistNames
              date
              image {
                url(version: "larger")
                aspectRatio
              }
              saleMessage
              title
            }
          }
        }
      }
    `,
  },
  {
    getConnectionFromProps(props) {
      return props.viewingRoom.artworksConnection
    },
    getVariables(props, { count, cursor }, _fragmentVariables) {
      return {
        id: props.viewingRoom.internalID,
        count,
        cursor,
      }
    },
    query: graphql`
      query ViewingRoomArtworksQuery($id: ID!, $count: Int!, $cursor: String) {
        viewingRoom(id: $id) {
          ...ViewingRoomArtworks_viewingRoom @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export const ViewingRoomArtworksRenderer: React.SFC<{ viewingRoomID: string }> = ({ viewingRoomID }) => {
  return (
    <QueryRenderer<ViewingRoomArtworksRendererQuery>
      environment={defaultEnvironment}
      query={graphql`
        query ViewingRoomArtworksRendererQuery($viewingRoomID: ID!) {
          viewingRoom(id: $viewingRoomID) {
            ...ViewingRoomArtworks_viewingRoom
          }
        }
      `}
      cacheConfig={{ force: true }}
      variables={{
        viewingRoomID,
      }}
      render={renderWithLoadProgress(ViewingRoomArtworksContainer)}
    />
  )
}
