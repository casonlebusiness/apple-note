import { Box } from '@mui/material';
import { AppContainer } from 'components/app-widgets/app-container';
import { NoteContent } from 'components/app-widgets/note-content';
import { NoteList } from 'components/app-widgets/note-list';

const IndexPage = (): JSX.Element => {
  return (
    <AppContainer>
      <Box sx={{ height: "100vh", overflow: "hidden" }} flex={1} alignSelf={"stretch"} display="flex" flexDirection={"row"} alignItems={"stretch"}>
        <NoteList />
        <NoteContent />
      </Box>
    </AppContainer>
  )
};

export default IndexPage;
