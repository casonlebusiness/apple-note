import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { deleteNote, postNote } from "api/notes/post-note";
import { auth } from "lib/firebase";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { appSlice } from "store/slices/appSlice";
import { RootState, store } from "store/store";
import { Note } from "types/notes/note";
import { convertToText } from 'utils/common';

export const NoteList = () => {

    const app = useSelector((state: RootState) => state.app)
    const [isAddable, setIsAddable] = useState(true)

    useEffect(() => {
        let notes = app.notes.filter((note) => {
            return note.data().mdContent.replace(/<[^>]*>/g, '').trim() == ""
        })

        if (notes.length > 0) {
            setIsAddable(false)
        } else {
            setIsAddable(true)
        }
    }, [app.notes])

    const handleLogout = () => {
        auth.signOut().then(data => {
            Router.replace("/login")
        })
    }

    const handleDeleteNote = () => {
        if (app.notes.length > 1) {
            let selected = app.selectedNote
            let length = app.notes.length
            deleteNote(app.notes[app.selectedNote].id).then(() => {
                if (selected == length - 1) {
                    store.dispatch(appSlice.actions.setSelectedNote(selected - 1))
                }
            })
        }
    }

    const handleAddNote = () => {
        let note: Note = {
            createdDate: new Date().getTime(),
            updatedDate: new Date().getTime(),
            mdContent: "",
            uid: auth.currentUser.uid
        }
        postNote(note).then(data => {
            store.dispatch(appSlice.actions.setSelectedNote(0))
        })
    }

    const handleClickNote = (index: number) => {
        if (index != 0) {
            let notes = app.notes.filter((note) => {
                return note.data().mdContent.replace(/<[^>]*>/g, '').trim() == ""
            })
            if (notes.length > 0) {
                notes.forEach(note => {
                    deleteNote(note.id)
                });
                store.dispatch(appSlice.actions.setSelectedNote(index - 1))
            } else {
                store.dispatch(appSlice.actions.setSelectedNote(index))
            }
        } else {
            store.dispatch(appSlice.actions.setSelectedNote(index))
        }

    }

    return (
        <Box maxWidth={"300px"} display={"flex"} flexDirection={"column"} flex={1} bgcolor={'#E6E1E6'}>
            <Stack direction={"row"}>
                <IconButton disabled={!isAddable} onClick={handleAddNote} aria-label="add" color="info">
                    <AddCircleIcon />
                </IconButton>
                <IconButton disabled={app.notes.length > 1 ? false : true} onClick={handleDeleteNote} aria-label="delete" color="warning">
                    <DeleteIcon />
                </IconButton>

                <Box flexGrow={1}></Box>
                <IconButton onClick={handleLogout} aria-label="logout" color="primary">
                    <LogoutIcon color="action" />
                </IconButton>
            </Stack>
            <Divider variant="fullWidth" />
            {app.notes.length > 0 ?
                <List sx={{ width: '100%', overflow: "scroll" }}>
                    {app.notes.map((note: any, index: number) => (
                        <>
                            <ListItem onClick={() => handleClickNote(index)} sx={{ backgroundColor: index == app.selectedNote ? "orange" : "transparent", cursor: "pointer", overflow: "hidden" }} alignItems="flex-start">
                                <ListItemText
                                    primary={<React.Fragment>
                                        <Typography variant="h5" sx={{ overflow: "hidden", textOverflow: "ellipsis", fontWeight: "600" }}>
                                            {note.data().mdContent.replace(/<[^>]*>/g, '') !== "" ? convertToText(note.data().mdContent).split('\n')[0] : "New Note"}
                                        </Typography>
                                    </React.Fragment>}
                                    secondary={
                                        <React.Fragment>
                                            <Stack direction={"row"} spacing={2} alignItems="center">
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="caption"
                                                    color="text.primary"
                                                >
                                                    {new Date(note.data().updatedDate).toLocaleString() + " "}
                                                </Typography>
                                                <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>
                                                    {convertToText(note.data().mdContent).split('\n').length > 1 ? convertToText(note.data().mdContent).split('\n')[1].trim() !== "" ? convertToText(note.data().mdContent).split('\n')[1] : "No additional text" : "No additional text"}
                                                </Typography>
                                            </Stack>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </>
                    ))}
                </List>
                :
                <Box width={"100%"} height={"100%"} alignItems="center" justifyContent="center" display={"flex"}>
                    <Typography color={"gray"} component="span" variant="h6">
                        Empty
                    </Typography>
                </Box>
            }

        </Box>
    )
}