import { PanGestureHandlerProps } from "react-native-gesture-handler"

// Task Item Interface
export interface ITaskItem
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  isEditing: boolean
  isDone: boolean
  subject: string
  onToggleCheckbox?: () => void
  onPressLabel?: () => void
  onRemove?: () => void
  onChangeSubject?: (subject: string) => void
  onFinishEditing?: () => void
}

export interface IAnimatedCheckBox {
  checked?: boolean
  highlightColor: string
  checkmarkColor: string
  boxOutlineColor: string
}

export interface IAnimatedTaskLabel {
  strikeThrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

export interface ISwipableView
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipeLeft?: () => void
}
