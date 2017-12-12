import React from "react"

import { LayoutAnimation, NavigatorIOS, Route, View, ViewProperties } from "react-native"
import { WhiteButton } from "../../Buttons"
import ConsignmentBG from "../Components/ConsignmentBG"

import { Schema, screenTrack } from "lib/utils/track"
import { ConsignmentSetup } from "../"
import { Form, Label, Row } from "../Components/FormElements"
import Text from "../Components/TextInput"
import Toggle from "../Components/Toggle"

interface Props extends ViewProperties {
  navigator: NavigatorIOS
  route: Route // this gets set by NavigatorIOS
  setup: ConsignmentSetup
  submitFinalSubmission: (state: ConsignmentSetup) => void
}

@screenTrack<Props>(props => ({
  context_screen: Schema.PageNames.ConsignmentsSubmission,
  context_screen_owner_slug: props.setup.submission_id,
  context_screen_owner_type: Schema.OwnerEntityTypes.Consignment,
}))
export default class FinalSubmissionQuestions extends React.Component<Props, ConsignmentSetup> {
  constructor(props) {
    super(props)
    this.state = props.setup
  }

  submitWork = () => {
    this.setState({ state: "SUBMITTED" }, () => this.props.submitFinalSubmission(this.state))
  }

  updateEdition = () => {
    // React Native's Typings are wrong here, I want to pass in
    // no arguments.
    const animate = LayoutAnimation.easeInEaseOut as any
    animate()

    this.setState({
      editionInfo: this.state.editionInfo ? null : {},
    })
  }

  updateSigned = () => this.setState({ signed: !this.state.signed })
  updateCert = () => this.setState({ certificateOfAuth: !this.state.certificateOfAuth })

  updateEditionSize = text => this.setState({ editionInfo: { ...this.state.editionInfo, size: text } })
  updateEditionNumber = text =>
    this.setState({ editionInfo: { ...this.state.editionInfo, number: parseInt(text, 10) } })

  render() {
    return (
      <ConsignmentBG>
        <Form title="Answer a few questions about the work">
          <Row>
            <Label>Is this an edition?</Label>
            <Toggle selected={!!this.state.editionInfo} left="YES" right="NO" onPress={this.updateEdition} />
          </Row>

          {this.state.editionInfo
            ? <Row>
                <Text
                  text={{
                    placeholder: "Edition Size",
                    keyboardType: "phone-pad",
                    onChangeText: this.updateEditionSize,
                    value: this.state.editionInfo && this.state.editionInfo.size,
                  }}
                  style={{ margin: 10 }}
                />
                <Text
                  text={{
                    placeholder: "Edition Number",
                    onChangeText: this.updateEditionNumber,
                    value:
                      this.state.editionInfo &&
                      this.state.editionInfo.number &&
                      this.state.editionInfo.number.toString(),
                  }}
                  style={{ margin: 10 }}
                />
              </Row>
            : null}

          <Row>
            <Label>Is this work signed?</Label>
            <Toggle selected={this.state.signed} left="YES" right="NO" onPress={this.updateSigned} />
          </Row>

          <Row>
            <Label>Do you have a certificate of authenticity?</Label>
            <Toggle selected={this.state.certificateOfAuth} left="YES" right="NO" onPress={this.updateCert} />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <View style={{ height: 43, width: 320, marginTop: 20 }}>
              <WhiteButton text="SUBMIT TO ARTSY" onPress={this.submitWork} style={{ flex: 1 }} />
            </View>
          </Row>
        </Form>
      </ConsignmentBG>
    )
  }
}
