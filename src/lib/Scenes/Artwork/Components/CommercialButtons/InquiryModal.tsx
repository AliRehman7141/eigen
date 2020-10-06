import { InquiryModal_artwork } from "__generated__/InquiryModal_artwork.graphql"
import { Checkbox } from "lib/Components/Bidding/Components/Checkbox"
import { FancyModal } from "lib/Components/FancyModal/FancyModal"
import { FancyModalHeader } from "lib/Components/FancyModal/FancyModalHeader"
import ChevronIcon from "lib/Icons/ChevronIcon"
import { Box, color, Flex, Separator, space, Text } from "palette"
import React from "react"
import NavigatorIOS from "react-native-navigator-ios"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components/native"
import { CollapsibleArtworkDetailsFragmentContainer } from "./CollapsibleArtworkDetails"

interface InquiryModalProps {
  artwork: InquiryModal_artwork
  closeModal?: () => void
  exitModal?: () => void
  toggleVisibility: () => void
  navigator?: NavigatorIOS
  modalIsVisible: boolean
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ artwork, ...props }) => {
  const { toggleVisibility, modalIsVisible } = props
  const renderInfoBox = (infoText: string): JSX.Element => {
    return (
      <InfoBox key={infoText}>
        <Flex flexDirection="row">
          <Checkbox />
          <Text variant="text">{infoText}</Text>
        </Flex>
        {infoText === "Shipping Quote" && (
          <>
            <Separator my={2} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Text variant="text" color="black60">
                Add your location
              </Text>
              <Box mt={0.5}>
                <ChevronIcon color="black60" />
              </Box>
            </Flex>
          </>
        )}
      </InfoBox>
    )
  }

  return (
    <FancyModal visible={modalIsVisible} onBackgroundPressed={() => toggleVisibility()}>
      <FancyModalHeader leftButtonText="Cancel" onLeftButtonPress={() => toggleVisibility()}>
        Contact Gallery
      </FancyModalHeader>
      <CollapsibleArtworkDetailsFragmentContainer artwork={artwork} />
      <Box m={2}>
        <Text variant="mediumText">What information are you looking for?</Text>
        {["Price & Availability", "Shipping Quote", "Condition & Provenance"].map((text) => {
          return renderInfoBox(text)
        })}
      </Box>
    </FancyModal>
  )
}

const InfoBox = styled(Flex)`
  border-radius: 5;
  border: solid 1px ${color("black10")};
  flex-direction: column;
  margin-top: ${space(1)}px;
  padding: ${space(2)}px;
`

export const InquiryModalFragmentContainer = createFragmentContainer(InquiryModal, {
  artwork: graphql`
    fragment InquiryModal_artwork on Artwork {
      ...CollapsibleArtworkDetails_artwork
    }
  `,
})
