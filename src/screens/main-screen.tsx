import * as React from "react"
import { VStack, useColorModeValue, Fab, Icon } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import AnimatedColorBox from "../components/animated-color-box"
import ThemeToggle from "../components/theme-toggle"
import TaskList from "../components/task-list"
import shortid from "shortid"
import Masthead from "../components/masthead"
import Navbar from "../components/navbar"

const initialData = [
  {
    id: shortid.generate(),
    subject: "buy movie tickets for Friday",
    done: false,
  },
  {
    id: shortid.generate(),
    subject: "Make a React Native tutorial",
    done: false,
  },
]

export default function MainScreen() {
  const [data, setData] = React.useState(initialData)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const handleToggleTaskItem = React.useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done,
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = React.useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject,
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = React.useCallback(_item => {
    setEditingItemId(null)
  }, [])

  const handlePresstaskItemLabel = React.useCallback(item => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = React.useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
    >
      <Masthead
        title="What's up, Aashish!"
        image={require("../assets/masthead.png")}
      >
        <Navbar />
      </Masthead>
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          editingItemId={editingItemId}
          onPressLabel={handlePresstaskItemLabel}
          onRemoveItem={handleRemoveItem}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: "",
              done: false,
            },
            ...data,
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
