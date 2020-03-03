import { cloneDeep } from "lodash"
import React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import FairsRail from "../FairsRail"

import { Theme } from "@artsy/palette"
import { FairsRail_fairs_module } from "__generated__/FairsRail_fairs_module.graphql"

const artworkNode = {
  node: {
    image: { url: "https://example.com/image.jpg" },
  },
}
const fairsModule: Omit<FairsRail_fairs_module, " $refType"> = {
  results: [
    {
      id: "the-fair",
      name: "The Fair",
      slug: "the-fair",
      exhibitionPeriod: "Monday–Friday",
      profile: { slug: "https://neopets.com" },
      heroImage: { url: "https://example.com/hero.jpg" },
      followedArtistArtworks: {
        edges: [artworkNode, artworkNode, artworkNode],
      },
      otherArtworks: {
        edges: [artworkNode, artworkNode, artworkNode],
      },
    },
    {
      id: "the-profileless-fair",
      slug: "the-profileless-fair",
      name: "The Profileless Fair: You Should Not See Me in Snapshots",
      exhibitionPeriod: "Monday–Friday",
      profile: null,
      heroImage: { url: "https://example.com/hero.jpg" },
      followedArtistArtworks: {
        edges: [artworkNode, artworkNode, artworkNode],
      },
      otherArtworks: {
        edges: [artworkNode, artworkNode, artworkNode],
      },
    },
  ],
}

it("looks correct when rendered", () => {
  const tree = renderer
    .create(
      <Theme>
        <FairsRail fairs_module={fairsModule as any} />
      </Theme>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it("looks correct when rendered with fairs missing artworks", () => {
  const fairsCopy = cloneDeep(fairsModule) as any // as any to make edges readwrite
  fairsCopy.results.forEach(result => {
    result.followedArtistArtworks.edges = []
    result.otherArtworks.edges = []
  })
  expect(() =>
    renderer
      .create(
        <Theme>
          <FairsRail fairs_module={fairsModule as any} />
        </Theme>
      )
      .toJSON()
  ).not.toThrow()
})
