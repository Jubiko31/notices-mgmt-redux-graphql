import { useEffect } from "react";
import {
        MenuItem, 
        Dialog, 
        DialogContent, 
        Grid, 
        Divider, 
        Button, 
        Typography,
        TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../services/queries/categoryQuery";
import { categoryActions } from "../../store/slices/categorySlice";
import { ADD_NOTE } from "../../services/mutations/NotesMutation";
import { GET_LIMITED_NOTES } from "../../services/queries/noteQuery";
import { addActions } from "../../store/slices/addSlice";

const AddModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const page = useSelector((state) => state.pagination.page);
  const { inputs } = useSelector((state) => state.newNotes)
  const { categories } = useSelector((state) => state.categories)

  useEffect(() => {
    !loading && 
      !error &&
      dispatch(categoryActions.getCategories(data.categories))
  }, [data, dispatch, error, loading])


  const handleUpdate = (name, value) => {
    dispatch(addActions.setInput({ name, value }));
  };
  //handle adding new notice
  const [addNote] = useMutation(ADD_NOTE, {
    variables: {
      name: inputs.name,
      surname: inputs.surname,
      phone: inputs.phone,
      email: inputs.email,
      date: inputs.date,
      categoryId: inputs.categoryId,
      text: inputs.text,
    },
    refetchQueries: [{ query:  GET_LIMITED_NOTES, variables: { limit: "7", offset: String((page - 1) * 7), fromDate: '', toDate: ''}}],
  })

  const handleClose = () => setOpen(false);
  const submitForm = () => {
    addNote();
    dispatch(
      addActions.clearInput({
        name: '',
        surname: '',
        email: '',
        phone: '',
        date: '',
        categoryId: '',
        text: '',
      })
    );

    setOpen(false);
  }
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={8}>
            <Grid container direction="row">
              <Grid item xs={8}>
                <Typography variant="h5" sx={{mb: 2}}>
                  Add New Notice
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={1}
            >
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Name"
                  id="name" 
                  helperText="* Enter your name"
                  onChange={({ target }) => {
                    handleUpdate('name', target.value);
                  }}
      
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Surname"
                  id="surname"
                  helperText="* Enter your surname"
                  onChange={({ target }) => {
                    handleUpdate('surname', target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Email"
                  id="Email"
                  helperText="* Enter valid email"
                  onChange={({ target }) => {
                    handleUpdate('email', target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Phone"
                  id="phone"
                  helperText="* Enter your phone number"
                  onChange={({ target }) => {
                    handleUpdate('phone', target.value);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  style={{ marginTop: 20 }}
                  label="Category"
                  fullWidth
                  select
                  variant="outlined"
                  value={inputs.categoryId}
                  margin="dense"
                  helperText="Please select category"
                  onChange={({ target }) => {
                    handleUpdate('categoryId', Number(target.value));
                  }}
                >
                  {!loading &&
                    !error &&
                  categories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category}
                      </MenuItem>
                     );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Date"
                  id="date"
                  defaultValue="2017-05-24"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="* Notice announment date"
                  onChange={({ target }) => {
                    handleUpdate('date', target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  rows="5"
                  variant="outlined"
                  label="Write your notice."
                  id="text"
                  onChange={({ target }) => {
                    handleUpdate('text', target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ ml: '40%', mt: 3 }}>
          <Button  onClick={handleClose} variant="contained" color="error">Cancel</Button>
          <Button  sx={{ ml: 7 }} onClick={submitForm} variant="contained" color="secondary">Sumbit</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddModal
