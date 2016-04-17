
declare interface CheckboxAndroidProperties extends React.Props<CheckboxAndroid> {
  value?: boolean
  disabled?: boolean
  onValueChange?: (value: boolean) => void
  style?: React.ViewStyle
}

declare interface CheckboxAndroid extends React.ComponentClass<CheckboxAndroidProperties> {
}