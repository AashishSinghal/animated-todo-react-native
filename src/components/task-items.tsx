import * as React from "react"
import {
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native"
import {
  Box,
  HStack,
  useTheme,
  themeTools,
  useColorModeValue,
  Icon,
  Input,
} from "native-base"
import AnimatedCheckbox from "./animated-checkbox"
import AnimatedTaskLabel from "./animated-task-label"
import { ITaskItem } from "../types"
import SwipableView from "./swipable-view"
import { Feather } from "@expo/vector-icons"
import { onChange } from "react-native-reanimated"

const TaskItem = (props: ITaskItem) => {
  const {
    isDone,
    onToggleCheckbox,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
    isEditing,
    subject,
    simultaneousHandlers,
  } = props
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue("blue.500", "blue.400")
  )
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue("muted.300", "muted.500")
  )
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue("white", "white")
  )
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue("darkText", "lightText")
  )
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue("muted.400", "muted.600")
  )

  const handleChangeSubject = React.useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text)
    },
    [onChangeSubject]
  )

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue("warmGray.50", "primary.900")}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Task Name..."
            value={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikeThrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  )
}

export default TaskItem
