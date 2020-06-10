import React from "react"
import { AppRegistry, NativeModules, View, YellowBox } from "react-native"

import { Theme } from "@artsy/palette"
import { SafeAreaInsets } from "lib/types/SafeAreaInsets"
import { ArtistQueryRenderer } from "./Containers/Artist"
import { BidFlowQueryRenderer } from "./Containers/BidFlow"
import { ConversationQueryRenderer } from "./Containers/Conversation"
import { GeneQueryRenderer } from "./Containers/Gene"
import { InboxQueryRenderer } from "./Containers/Inbox"
import { InquiryQueryRenderer } from "./Containers/Inquiry"
import { RegistrationFlowQueryRenderer } from "./Containers/RegistrationFlow"
import { WorksForYouQueryRenderer } from "./Containers/WorksForYou"
import { ArtworkQueryRenderer } from "./Scenes/Artwork/Artwork"
import { ArtworkAttributionClassFAQQueryRenderer } from "./Scenes/ArtworkAttributionClassFAQ"
import { CityView } from "./Scenes/City"
import { CityBMWListQueryRenderer } from "./Scenes/City/CityBMWList"
import { CityFairListQueryRenderer } from "./Scenes/City/CityFairList"
import { CityPicker } from "./Scenes/City/CityPicker"
import { CitySavedListQueryRenderer } from "./Scenes/City/CitySavedList"
import { CitySectionListQueryRenderer } from "./Scenes/City/CitySectionList"
import { CollectionQueryRenderer } from "./Scenes/Collection/Collection"
import { CollectionFullFeaturedArtistListQueryRenderer } from "./Scenes/Collection/Components/FullFeaturedArtistList"
import Consignments from "./Scenes/Consignments"
import { SellTabLanding } from "./Scenes/Consignments/SellTabLanding"
import {
  FairArtistsQueryRenderer,
  FairArtworksQueryRenderer,
  FairBMWArtActivationQueryRenderer,
  FairBoothQueryRenderer,
  FairExhibitorsQueryRenderer,
  FairMoreInfoQueryRenderer,
} from "./Scenes/Fair"
import { FairQueryRenderer } from "./Scenes/Fair/Fair"
import FavoritesScene from "./Scenes/Favorites"
import { HomeQueryRenderer } from "./Scenes/Home/Home"
import { MapContainer } from "./Scenes/Map"
import { NewSubmissionForm } from "./Scenes/MyCollection/NewSubmissionForm"
import { PartnerQueryRenderer } from "./Scenes/Partner"
import { PartnerLocationsQueryRenderer } from "./Scenes/Partner/Screens/PartnerLocations"
import { PrivacyRequest } from "./Scenes/PrivacyRequest"
import { SalesQueryRenderer } from "./Scenes/Sales"
import { Search } from "./Scenes/Search"
import { MyProfileQueryRenderer } from "./Scenes/Settings/MyProfile"
import { ShowArtistsQueryRenderer, ShowArtworksQueryRenderer, ShowMoreInfoQueryRenderer } from "./Scenes/Show"
import { ShowQueryRenderer } from "./Scenes/Show/Show"
import { ViewingRoomQueryRenderer } from "./Scenes/ViewingRoom/ViewingRoom"
import { ViewingRoomArtworksQueryRenderer } from "./Scenes/ViewingRoom/ViewingRoomArtworks"
import { Schema, screenTrack, track } from "./utils/track"
import { ProvideScreenDimensions, useScreenDimensions } from "./utils/useScreenDimensions"

YellowBox.ignoreWarnings([
  "Calling `getNode()` on the ref of an Animated component is no longer necessary.",
  "RelayResponseNormalizer: Payload did not contain a value for field `id: id`. Check that you are parsing with the same query that was used to fetch the payload.",
  // Deprecated, we'll transition when it's removed.
  "Warning: ListView is deprecated and will be removed in a future release. See https://fb.me/nolistview for more information",

  // RN 0.59.0 ships with RNCameraRoll with this issue: https://github.com/facebook/react-native/issues/23755
  // We can remove this once this PR gets shipped and we update: https://github.com/facebook/react-native/pull/24314
  "Module RCTImagePickerManager requires main queue setup since it overrides `init`",

  // RN 0.59.0 ships with this bug, see: https://github.com/facebook/react-native/issues/16376
  "RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks",

  // The following two items exist in node_modules. Once this PR is merged, to make warnings opt-in, we can ignore: https://github.com/facebook/metro/issues/287

  // react-native-sentry ships with this error, tracked here: https://github.com/getsentry/react-native-sentry/issues/479
  "Require cycle: node_modules/react-native-sentry/lib/Sentry.js -> node_modules/react-native-sentry/lib/RavenClient.js -> node_modules/react-native-sentry/lib/Sentry.js",
  // RN 0.59.0 ships with this issue, which has been effectively marked as #wontfix: https://github.com/facebook/react-native/issues/23130
  "Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/react-native/Libraries/vendor/core/whatwg-fetch.js -> node_modules/react-native/Libraries/Network/fetch.js",

  // This is for the Artist page, which will likely get redone soon anyway.
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
])

interface PartnerProps {
  partnerID: string
  safeAreaInsets: SafeAreaInsets
  isVisible: boolean
}

const Partner: React.SFC<PartnerProps> = props => <PartnerQueryRenderer {...props} />

interface PartnerLocationsProps {
  partnerID: string
  safeAreaInsets: SafeAreaInsets
  isVisible: boolean
}
const PartnerLocations: React.SFC<PartnerLocationsProps> = props => <PartnerLocationsQueryRenderer {...props} />

const Inbox: React.SFC<{}> = screenTrack<{}>(
  // @ts-ignore STRICTNESS_MIGRATION
  () => {
    return { context_screen: Schema.PageNames.InboxPage, context_screen_owner_type: null }
  }
  // @ts-ignore STRICTNESS_MIGRATION
)(props => <InboxQueryRenderer {...props} />)

interface GeneProps {
  geneID: string
  refineSettings: { medium: string; price_range: string }
}

const Gene: React.SFC<GeneProps> = screenTrack<GeneProps>(props => {
  return {
    context_screen: Schema.PageNames.GenePage,
    context_screen_owner_slug: props.geneID,
    context_screen_owner_type: Schema.OwnerEntityTypes.Gene,
  }
})(({ geneID, refineSettings: { medium, price_range } }) => {
  const initialProps = { geneID, medium, price_range }
  return <GeneQueryRenderer {...initialProps} />
})

interface InquiryProps {
  artworkID: string
}
const Inquiry: React.SFC<InquiryProps> = screenTrack<InquiryProps>(props => {
  return {
    context_screen: Schema.PageNames.InquiryPage,
    context_screen_owner_slug: props.artworkID,
    context_screen_owner_type: Schema.OwnerEntityTypes.Artwork,
  }
})(props => <InquiryQueryRenderer {...props} />)

interface ConversationProps {
  conversationID: string
}
const Conversation: React.SFC<ConversationProps> = screenTrack<ConversationProps>(props => {
  return {
    context_screen: Schema.PageNames.ConversationPage,
    context_screen_owner_id: props.conversationID,
    context_screen_owner_type: Schema.OwnerEntityTypes.Conversation,
  }
})(ConversationQueryRenderer)

/*
 * Route bid/register requests coming from the Emission pod to either a BidFlow
 * or RegisterFlow component with an appropriate query renderer
 */
type BidderFlowIntent = "bid" | "register"
interface BidderFlowProps {
  artworkID?: string
  saleID: string
  intent: BidderFlowIntent
}

const BidderFlow: React.SFC<BidderFlowProps> = ({ intent, ...restProps }) => {
  switch (intent) {
    case "bid":
      return <BidFlowQueryRenderer {...restProps} />
    case "register":
      return <RegistrationFlowQueryRenderer {...restProps} />
  }
}

interface ShowArtistsProps {
  showID: string
}
const ShowArtists: React.SFC<ShowArtistsProps> = ({ showID }) => {
  return <ShowArtistsQueryRenderer showID={showID} />
}

interface ShowArtworksProps {
  showID: string
}
const ShowArtworks: React.SFC<ShowArtworksProps> = ({ showID }) => {
  return <ShowArtworksQueryRenderer showID={showID} />
}

interface ShowMoreInfoProps {
  showID: string
}
const ShowMoreInfo: React.SFC<ShowMoreInfoProps> = ({ showID }) => {
  return <ShowMoreInfoQueryRenderer showID={showID} />
}

interface FairBoothProps {
  fairBoothID: string
}

const FairBooth: React.SFC<FairBoothProps> = ({ fairBoothID }) => {
  return <FairBoothQueryRenderer showID={fairBoothID} />
}

interface FairArtistsProps {
  fairID: string
}

const FairArtists: React.SFC<FairArtistsProps> = screenTrack<FairArtistsProps>(props => {
  return {
    context_screen: Schema.PageNames.FairAllArtistsPage,
    context_screen_owner_slug: props.fairID,
    context_screen_owner_type: Schema.OwnerEntityTypes.Fair,
  }
})(({ fairID }) => {
  return <FairArtistsQueryRenderer fairID={fairID} />
})

interface FairArtworksProps {
  fairID: string
}

const FairArtworks: React.SFC<FairArtworksProps> = ({ fairID }) => {
  return <FairArtworksQueryRenderer fairID={fairID} />
}

interface FairExhibitorsProps {
  fairID: string
}

const FairExhibitors: React.SFC<FairExhibitorsProps> = ({ fairID }) => {
  return <FairExhibitorsQueryRenderer fairID={fairID} />
}

interface FairBMWArtActivationProps {
  fairID: string
}
const FairBMWArtActivation: React.SFC<FairBMWArtActivationProps> = ({ fairID }) => {
  return <FairBMWArtActivationQueryRenderer fairID={fairID} />
}

interface SearchWithTrackingProps {
  safeAreaInsets: SafeAreaInsets
}
const SearchWithTracking: React.SFC<SearchWithTrackingProps> = screenTrack<SearchWithTrackingProps>(() => {
  return {
    context_screen: Schema.PageNames.Search,
    context_screen_owner_type: Schema.OwnerEntityTypes.Search,
  }
})(props => {
  return <Search {...props} />
})

interface PageWrapperProps {
  fullBleed?: boolean
}

const InnerPageWrapper: React.FC<PageWrapperProps> = ({ children, fullBleed }) => {
  const paddingTop = fullBleed ? 0 : useScreenDimensions().safeAreaInsets.top
  return <View style={{ flex: 1, paddingTop }}>{children}</View>
}

// provide the tracking context so pages can use `useTracking` all the time
@track()
class PageWrapper extends React.Component<PageWrapperProps> {
  render() {
    return (
      <Theme>
        <ProvideScreenDimensions>
          <InnerPageWrapper {...this.props} />
        </ProvideScreenDimensions>
      </Theme>
    )
  }
}

function register(
  routes: string | string[] | null,
  screenName: string,
  Component: React.ComponentType<any>,
  options?: PageWrapperProps
) {
  const WrappedComponent = (props: any) => (
    <PageWrapper {...options}>
      <Component {...props} />
    </PageWrapper>
  )
  AppRegistry.registerComponent(screenName, () => WrappedComponent)
  if (routes) {
    if (!Array.isArray(routes)) {
      routes = [routes]
    }
    routes.forEach(route => NativeModules.ARSwitchBoardModule.registerRoute(route, screenName))
  }
}

// If the 'route' parameter is null it means the route is registered on the native side (probably in ARSwitchBoard.m)
register(["/artist/:artistID", "/:profileID/artist/:artistID"], "Artist", ArtistQueryRenderer)
register(null, "Artwork", ArtworkQueryRenderer)
register("/artwork-classifications", "ArtworkAttributionClassFAQ", ArtworkAttributionClassFAQQueryRenderer)
// TODO: finish adapting these
register(null, "Auctions", SalesQueryRenderer)
register(null, "BidFlow", BidderFlow)
register(null, "City", CityView, { fullBleed: true })
register(null, "CityBMWList", CityBMWListQueryRenderer, { fullBleed: true })
register(null, "CityFairList", CityFairListQueryRenderer, { fullBleed: true })
register(null, "CityPicker", CityPicker, { fullBleed: true })
register(null, "CitySavedList", CitySavedListQueryRenderer)
register(null, "CitySectionList", CitySectionListQueryRenderer)
register(null, "Collection", CollectionQueryRenderer, { fullBleed: true })
register(null, "Consignments", Consignments)
register(null, "SellTabLanding", SellTabLanding)
register(null, "Conversation", Conversation)
register(null, "Fair", FairQueryRenderer, { fullBleed: true })
register(null, "FairArtists", FairArtists)
register(null, "FairArtworks", FairArtworks)
register(null, "FairBMWArtActivation", FairBMWArtActivation, { fullBleed: true })
register(null, "FairBooth", FairBooth)
register(null, "FairExhibitors", FairExhibitors)
register(null, "FairMoreInfo", FairMoreInfoQueryRenderer)
register(null, "Favorites", FavoritesScene)
register(null, "FullFeaturedArtistList", CollectionFullFeaturedArtistListQueryRenderer)
register(null, "Gene", Gene)
register(null, "Home", HomeQueryRenderer)
register(null, "Inbox", Inbox)
register(null, "Inquiry", Inquiry)
register(null, "Map", MapContainer, { fullBleed: true })
register(null, "MyProfile", MyProfileQueryRenderer)
register(null, "MySellingProfile", View)
register(null, "NewSubmissionForm", NewSubmissionForm)
register(null, "Partner", Partner, { fullBleed: true })
register(null, "PartnerLocations", PartnerLocations)
register(null, "PrivacyRequest", PrivacyRequest)
register(null, "Sales", Consignments) // Placeholder for sales tab!
register(null, "Search", SearchWithTracking)
register(null, "Show", ShowQueryRenderer)
register(null, "ShowArtists", ShowArtists)
register(null, "ShowArtworks", ShowArtworks)
register(null, "ShowMoreInfo", ShowMoreInfo)
register(null, "ViewingRoom", ViewingRoomQueryRenderer, { fullBleed: true })
register(null, "ViewingRoomArtworks", ViewingRoomArtworksQueryRenderer)
register(null, "WorksForYou", WorksForYouQueryRenderer)
