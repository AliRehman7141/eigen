/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueryRenderersForYouQueryVariables = {};
export type QueryRenderersForYouQueryResponse = {
    readonly forYou: {
        readonly " $fragmentRefs": FragmentRefs<"ForYou_forYou">;
    } | null;
};
export type QueryRenderersForYouQuery = {
    readonly response: QueryRenderersForYouQueryResponse;
    readonly variables: QueryRenderersForYouQueryVariables;
};



/*
query QueryRenderersForYouQuery {
  forYou: homePage {
    ...ForYou_forYou
  }
}

fragment ForYou_forYou on HomePage {
  artwork_modules: artworkModules(maxRails: -1, maxFollowedGeneRails: -1, order: [ACTIVE_BIDS, RECENTLY_VIEWED_WORKS, RECOMMENDED_WORKS, FOLLOWED_ARTISTS, RELATED_ARTISTS, FOLLOWED_GALLERIES, SAVED_WORKS, LIVE_AUCTIONS, CURRENT_FAIRS, FOLLOWED_GENES], exclude: [FOLLOWED_ARTISTS, GENERIC_GENES]) {
    id
    ...ArtworkCarousel_rail
  }
  artist_modules: artistModules {
    id
    ...ArtistRail_rail
  }
  fairs_module: fairsModule {
    ...FairsRail_fairs_module
  }
}

fragment ArtworkCarousel_rail on HomePageArtworkModule {
  ...ArtworkCarouselHeader_rail
  id
  key
  params {
    medium
    price_range: priceRange
  }
  context {
    __typename
    ... on HomePageFollowedArtistArtworkModule {
      artist {
        href
        id
      }
    }
    ... on HomePageRelatedArtistArtworkModule {
      artist {
        href
        id
      }
    }
    ... on Fair {
      href
    }
    ... on Gene {
      href
    }
    ... on Sale {
      href
    }
    ... on Node {
      id
    }
  }
  results {
    ...GenericGrid_artworks
    id
  }
}

fragment ArtistRail_rail on HomePageArtistModule {
  id
  key
  results {
    id
    internalID
    ...ArtistCard_artist
  }
}

fragment FairsRail_fairs_module on HomePageFairsModule {
  results {
    id
    slug
    profile {
      slug
      id
    }
    name
    exhibitionPeriod
    heroImage: image {
      url(version: "large")
    }
    followedArtistArtworks: filterArtworksConnection(first: 2, includeArtworksByFollowedArtists: true) {
      edges {
        node {
          image {
            url(version: "large")
          }
          id
        }
      }
      id
    }
    otherArtworks: filterArtworksConnection(first: 2) {
      edges {
        node {
          image {
            url(version: "large")
          }
          id
        }
      }
      id
    }
  }
}

fragment ArtistCard_artist on Artist {
  id
  slug
  internalID
  href
  name
  formattedNationalityAndBirthday
  avatar: image {
    url(version: "small")
  }
  artworksConnection(first: 3) {
    edges {
      node {
        image {
          url(version: "large")
        }
        id
      }
    }
  }
}

fragment ArtworkCarouselHeader_rail on HomePageArtworkModule {
  title
  key
  context {
    __typename
    ... on HomePageFollowedArtistArtworkModule {
      artist {
        internalID
        slug
        id
      }
    }
    ... on HomePageRelatedArtistArtworkModule {
      artist {
        internalID
        slug
        id
      }
      based_on: basedOn {
        name
        id
      }
    }
    ... on Node {
      id
    }
  }
}

fragment GenericGrid_artworks on Artwork {
  id
  image {
    aspect_ratio: aspectRatio
  }
  ...ArtworkGridItem_artwork
}

fragment ArtworkGridItem_artwork on Artwork {
  title
  date
  sale_message: saleMessage
  is_biddable: isBiddable
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  slug
  sale {
    is_auction: isAuction
    is_closed: isClosed
    display_timely_at: displayTimelyAt
    id
  }
  sale_artwork: saleArtwork {
    current_bid: currentBid {
      display
    }
    id
  }
  image {
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  artists(shallow: true) {
    name
    id
  }
  partner {
    name
    id
  }
  href
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "key",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artist",
  "storageKey": null,
  "args": null,
  "concreteType": "Artist",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v0/*: any*/),
    (v5/*: any*/)
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = [
  (v7/*: any*/),
  (v0/*: any*/)
],
v9 = [
  (v5/*: any*/)
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large"
    }
  ],
  "storageKey": "url(version:\"large\")"
},
v11 = [
  (v10/*: any*/)
],
v12 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "node",
    "storageKey": null,
    "args": null,
    "concreteType": "Artwork",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "image",
        "storageKey": null,
        "args": null,
        "concreteType": "Image",
        "plural": false,
        "selections": (v11/*: any*/)
      },
      (v0/*: any*/)
    ]
  }
],
v13 = {
  "kind": "Literal",
  "name": "first",
  "value": 2
},
v14 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "FilterArtworksEdge",
    "plural": true,
    "selections": (v12/*: any*/)
  },
  (v0/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "QueryRenderersForYouQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "forYou",
        "name": "homePage",
        "storageKey": null,
        "args": null,
        "concreteType": "HomePage",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ForYou_forYou",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "QueryRenderersForYouQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "forYou",
        "name": "homePage",
        "storageKey": null,
        "args": null,
        "concreteType": "HomePage",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "artwork_modules",
            "name": "artworkModules",
            "storageKey": "artworkModules(exclude:[\"FOLLOWED_ARTISTS\",\"GENERIC_GENES\"],maxFollowedGeneRails:-1,maxRails:-1,order:[\"ACTIVE_BIDS\",\"RECENTLY_VIEWED_WORKS\",\"RECOMMENDED_WORKS\",\"FOLLOWED_ARTISTS\",\"RELATED_ARTISTS\",\"FOLLOWED_GALLERIES\",\"SAVED_WORKS\",\"LIVE_AUCTIONS\",\"CURRENT_FAIRS\",\"FOLLOWED_GENES\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "exclude",
                "value": [
                  "FOLLOWED_ARTISTS",
                  "GENERIC_GENES"
                ]
              },
              {
                "kind": "Literal",
                "name": "maxFollowedGeneRails",
                "value": -1
              },
              {
                "kind": "Literal",
                "name": "maxRails",
                "value": -1
              },
              {
                "kind": "Literal",
                "name": "order",
                "value": [
                  "ACTIVE_BIDS",
                  "RECENTLY_VIEWED_WORKS",
                  "RECOMMENDED_WORKS",
                  "FOLLOWED_ARTISTS",
                  "RELATED_ARTISTS",
                  "FOLLOWED_GALLERIES",
                  "SAVED_WORKS",
                  "LIVE_AUCTIONS",
                  "CURRENT_FAIRS",
                  "FOLLOWED_GENES"
                ]
              }
            ],
            "concreteType": "HomePageArtworkModule",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "context",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "type": "HomePageFollowedArtistArtworkModule",
                    "selections": [
                      (v6/*: any*/)
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "HomePageRelatedArtistArtworkModule",
                    "selections": [
                      (v6/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": "based_on",
                        "name": "basedOn",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artist",
                        "plural": false,
                        "selections": (v8/*: any*/)
                      }
                    ]
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Fair",
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Gene",
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "Sale",
                    "selections": (v9/*: any*/)
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "params",
                "storageKey": null,
                "args": null,
                "concreteType": "HomePageModulesParams",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "medium",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "price_range",
                    "name": "priceRange",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "results",
                "storageKey": null,
                "args": null,
                "concreteType": "Artwork",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": "aspect_ratio",
                        "name": "aspectRatio",
                        "args": null,
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ]
                  },
                  (v1/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "date",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "sale_message",
                    "name": "saleMessage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "is_biddable",
                    "name": "isBiddable",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "is_acquireable",
                    "name": "isAcquireable",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "is_offerable",
                    "name": "isOfferable",
                    "args": null,
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "sale",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Sale",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": "is_auction",
                        "name": "isAuction",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_closed",
                        "name": "isClosed",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "display_timely_at",
                        "name": "displayTimelyAt",
                        "args": null,
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "sale_artwork",
                    "name": "saleArtwork",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": "current_bid",
                        "name": "currentBid",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "SaleArtworkCurrentBid",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "display",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      (v0/*: any*/)
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artists",
                    "storageKey": "artists(shallow:true)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "shallow",
                        "value": true
                      }
                    ],
                    "concreteType": "Artist",
                    "plural": true,
                    "selections": (v8/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "partner",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Partner",
                    "plural": false,
                    "selections": (v8/*: any*/)
                  },
                  (v5/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_modules",
            "name": "artistModules",
            "storageKey": null,
            "args": null,
            "concreteType": "HomePageArtistModule",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "results",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "formattedNationalityAndBirthday",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "avatar",
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "small"
                          }
                        ],
                        "storageKey": "url(version:\"small\")"
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworksConnection",
                    "storageKey": "artworksConnection(first:3)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "plural": true,
                        "selections": (v12/*: any*/)
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "fairs_module",
            "name": "fairsModule",
            "storageKey": null,
            "args": null,
            "concreteType": "HomePageFairsModule",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "results",
                "storageKey": null,
                "args": null,
                "concreteType": "Fair",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "profile",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Profile",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v0/*: any*/)
                    ]
                  },
                  (v7/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "exhibitionPeriod",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "heroImage",
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": (v11/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "followedArtistArtworks",
                    "name": "filterArtworksConnection",
                    "storageKey": "filterArtworksConnection(first:2,includeArtworksByFollowedArtists:true)",
                    "args": [
                      (v13/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "includeArtworksByFollowedArtists",
                        "value": true
                      }
                    ],
                    "concreteType": "FilterArtworksConnection",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "otherArtworks",
                    "name": "filterArtworksConnection",
                    "storageKey": "filterArtworksConnection(first:2)",
                    "args": [
                      (v13/*: any*/)
                    ],
                    "concreteType": "FilterArtworksConnection",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "QueryRenderersForYouQuery",
    "id": "55f907742af6eed928863b488dc5ebaf",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = '7b73e6512452bb11a8e6e0444cb760f5';
export default node;
