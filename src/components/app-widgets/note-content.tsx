import { Box } from "@mui/material";
import { deleteNote, updateNote } from "api/notes/post-note";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appSlice } from "store/slices/appSlice";
import { RootState, store } from "store/store";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

export const NoteContent = () => {
    const [value, setValue] = useState("")
    const app = useSelector((state: RootState) => state.app)
    const [firstLoad, setFirstLoad] = useState(true)
    const [focus, setFocus] = useState(false)
    const [disable, setDisable] = useState(false)
    const [currentID, setCurrentID] = useState("")

    const handleChange = (newvalue) => {
        setValue(newvalue)

        if (currentID == app.notes[app.selectedNote].id) {
            if (app.notes[app.selectedNote] != undefined) {
                let note = app.notes[app.selectedNote].data()
                note.mdContent = newvalue
                updateNote(note, app.notes[app.selectedNote].id).then(data => {
                    store.dispatch(appSlice.actions.setSelectedNote(0))
                })
            }
        } else {
            setCurrentID(app.notes[app.selectedNote].id)
        }
    }

    const handleOnBlur = () => {
        if (app.notes.length > 0) {
            if (app.notes.length > 1) {
                if (value.replace(/<[^>]*>/g, '').trim() === "") {
                    deleteNote(app.notes[app.selectedNote].id)
                }
            }
        } else {
            setValue("")
        }
    }

    useEffect(() => {
        updateText()
    }, [app.selectedNote])

    useEffect(() => {
        if (!focus) {
            updateText()
        }
        if (app.notes.length > 0) {
            setDisable(false)
        } else {
            setValue("")
            setDisable(true)
        }
    }, [app.notes])

    const handleOnFucus = (focus: boolean) => {
        setFocus(focus)
    }

    const updateText = () => {
        if (app.notes[app.selectedNote] != undefined) {
            setValue(app.notes[app.selectedNote].data().mdContent)
        }
    }

    useEffect(() => {
        if (app.notes[app.selectedNote] != undefined && firstLoad) {
            setCurrentID(app.notes[app.selectedNote].id)
            setValue(app.notes[app.selectedNote].data().mdContent)
            setFirstLoad(false)
        }
    }, [app.notes, app.selectedNote])

    return (
        <Box display={"flex"} flexDirection={"column"} flex={2} bgcolor={'whitesmoke'}>

            <QuillNoSSRWrapper
                style={{ height: "100%" }}
                onKeyUp={() => handleOnFucus(false)}
                onKeyDown={() => handleOnFucus(true)}
                onBlur={() => handleOnBlur()}
                value={value}
                onChange={handleChange}
                theme="snow"
                modules={{
                    clipboard: {
                        matchVisual: false
                    }
                }}
            />
        </Box>
    )
}