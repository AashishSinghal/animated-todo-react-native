import * as React from "react"
import { AnimatePresence, View } from "moti"
import {
  PanGestureHandlerProps,
  ScrollView,
} from "react-native-gesture-handler"
import TaskItem from "./task-items"
import { makeStyledComponent } from "../utils/styled"

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface ITaskItemData {
  id: string
  subject: string
  done: boolean
}

interface ITaskListProps {
  data: Array<ITaskItemData>
  editingItemId: string | null
  onToggleItem: (item: ITaskItemData) => void
  onChangeSubject: (item: ITaskItemData, newSubject: string) => void
  onFinishEditing: (item: ITaskItemData) => void
  onRemoveItem: (item: ITaskItemData) => void
  onPressLabel: (item: ITaskItemData) => void
}

interface ITaskItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  data: ITaskItemData
  isEditing: boolean
  onToggleItem: (item: ITaskItemData) => void
  onChangeSubject: (item: ITaskItemData, newSubject: string) => void
  onFinishEditing: (item: ITaskItemData) => void
  onPressLabel: (item: ITaskItemData) => void
  onRemove: (item: ITaskItemData) => void
}

export const AnimatedTaskItem = (props: ITaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onChangeSubject,
    onFinishEditing,
    onRemove,
    onPressLabel,
    onToggleItem,
  } = props

  const handleToggleCheckbox = React.useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeSubject = React.useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )

  const handleFinishEditing = React.useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])

  const handlePressLabel = React.useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = React.useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        margibbottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 1,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function TaskList(props: ITaskListProps) {
  const {
    data,
    editingItemId,
    onChangeSubject,
    onFinishEditing,
    onRemoveItem,
    onToggleItem,
    onPressLabel,
  } = props
  const refScrollView = React.useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
