import { Touchable, TouchableProps, useColor } from "palette"

export type TouchableRowProps = TouchableProps

export const TouchableRow: React.FC<TouchableRowProps> = ({ children, ...rest }) => {
  const color = useColor()
  return (
    <Touchable underlayColor={color("black5")} {...rest}>
      {children}
    </Touchable>
  )
}
