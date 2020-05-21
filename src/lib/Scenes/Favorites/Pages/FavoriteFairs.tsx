import { SavedFairItemRow } from "lib/Components/Lists/SavedFairItemRow"
import { Spinner } from "lib/Components/Spinner"
import { ZeroState } from "lib/Components/States/ZeroState"
import { PAGE_SIZE } from "lib/data/constants"
import React, { Component } from "react"
import { FlatList, RefreshControl } from "react-native"
import { createPaginationContainer, graphql, QueryRenderer, RelayPaginationProp } from "react-relay"

import { Fairs_me } from "__generated__/Fairs_me.graphql"
import { FavoriteFairsQuery } from "__generated__/FavoriteFairsQuery.graphql"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { renderWithLoadProgress } from "lib/utils/renderWithLoadProgress"

interface Props {
  me: Fairs_me
  relay: RelayPaginationProp
  onDataFetching?: (loading: boolean) => void
}

interface State {
  fetchingMoreData: boolean
  refreshingFromPull: boolean
}

class FavoriteFairs extends Component<Props, State> {
  state = {
    fetchingMoreData: false,
    refreshingFromPull: false,
  }

  loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    this.setState({ fetchingMoreData: true })
    this.props.relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        // FIXME: Handle error
        console.error("Fairs/index.tsx", error.message)
      }
      this.setState({ fetchingMoreData: false })
    })
  }

  handleRefresh = () => {
    this.setState({ refreshingFromPull: true })
    this.props.relay.refetchConnection(PAGE_SIZE, error => {
      if (error) {
        // FIXME: Handle error
        console.error("Fairs/index.tsx #handleRefresh", error.message)
      }
      this.setState({ refreshingFromPull: false })
    })
  }

  // @TODO: Implement test on this component https://artsyproduct.atlassian.net/browse/LD-563
  render() {
    const fairs = this.props.me.followsAndSaves?.fairs?.edges?.filter(edge => edge?.node?.profile?.is_followed) || []

    if (fairs.length === 0 || !fairs) {
      return (
        <ZeroState
          title="You haven’t followed any fairs yet"
          subtitle="Follow fairs to get notified about new fairs that have been added to Artsy."
        />
      )
    }

    return (
      <FlatList
        data={fairs}
        keyExtractor={item => item?.node?.id!}
        renderItem={item => <SavedFairItemRow node={item.item?.node!} relay={this.props.relay as any} />}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
        refreshControl={<RefreshControl refreshing={this.state.refreshingFromPull} onRefresh={this.handleRefresh} />}
        ListFooterComponent={
          this.state.fetchingMoreData ? <Spinner style={{ marginTop: 20, marginBottom: 20 }} /> : null
        }
      />
    )
  }
}

 const FavoriteFairsContainer = createPaginationContainer(
  FavoriteFairs,
  {
    me: graphql`
      fragment Fairs_me on Me
        @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String", defaultValue: "" }) {
        followsAndSaves {
          fairs: fairsConnection(first: $count, after: $cursor) @connection(key: "SavedFairs_fairs") {
            edges {
              node {
                id
                profile {
                  slug
                  is_followed: isFollowed
                  id
                }
                exhibition_period: exhibitionPeriod
                name
                counts {
                  partners
                }
                href
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.me.followsAndSaves?.fairs
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query FavoriteFairsQuery($count: Int!, $cursor: String) {
        me {
          ...FavoriteFairs_me @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export const FavoriteFairsRenderer = () => {
  return (
    <QueryRenderer<FavoriteFairsQuery>
      environment={defaultEnvironment}
      query={graphql`
        query FavoriteFairsQuery {
          me {
            ...FavoriteFairs_me
          }
        }
      `}
      variables={{
        count: 10,
      }}
      render={renderWithLoadProgress(FavoriteFairsContainer)}
    />
  )
}
