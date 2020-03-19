import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";

import RadioButtonsGroup from "./radio";

export default class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      picture: this.props.picture,
      category: this.props.category,
      open: false
    };
  }

  // A method that is responsible for opening the modal
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  // A method that is responsible for closing the modal
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  // Handle the text fields' values
  handleTextField = event => {
    const input = event.target;

    // If conditions to know which field's value has been changed based on id and set new value in the state
    if (input.id === "name") {
      this.setState({
        name: input.value
      });
    } else if (input.id === "description") {
      this.setState({
        description: input.value
      });
    } else if (input.id === "price") {
      this.setState({
        price: input.value
      });
    } else if (input.id === "picture") {
      this.setState({
        picture: input.value
      });
    } else {
      this.setState({
        category: input.value
      });
    }
  };

  // A function to trigger the parent's function to edit the item once the save button clicked
  editItem = event => {
    this.handleClose();

    // Create a new item object with the updated values
    const menuItem = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      picture: this.state.picture,
      category: this.state.category
    };

    // Pass the id and the new menu item to the grand parent (menuContainer)
    this.props.editItem(this.props.id, menuItem);
  };

  // callback for the category
  callbackFunction = childData => {
    console.log(childData);
    this.setState({ category: childData });
  };

  // handle change event method for the radio buttons
  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  render() {
    return (
      <div>
        <Button
          style={{
            color: "#4c6873",
            backgroundColor: "#d9d4cc",
            margin: "2%",
            fontFamily: "Ubuntu",
            fontWeight: "bold"
          }}
          startIcon={<EditIcon />}
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit a menu item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              id="name"
              fullWidth
              onChange={this.handleTextField}
              value={this.state.name}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              id="description"
              multiline
              fullWidth
              onChange={this.handleTextField}
              value={this.state.description}
            />
            <TextField
              autoFocus
              margin="dense"
              type="number"
              label="Price"
              InputProps={{
                endAdornment: <InputAdornment position="end">SR</InputAdornment>
              }}
              id="price"
              fullWidth
              onChange={this.handleTextField}
              value={this.state.price}
            />
            <TextField
              autoFocus
              margin="dense"
              label="PictureURL"
              id="picture"
              fullWidth
              onChange={this.handleTextField}
              value={this.state.picture}
            />
            {/* <TextField
              autoFocus
              margin="dense"
              label="Category"
              id="category"
              fullWidth
              onChange={this.handleTextField}
              value={this.state.category}
            /> */}
            <RadioButtonsGroup
              id="category"
              value={this.state.category}
              handleChange={this.handleChange}
              // parentCallback={this.callbackFunction}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.editItem} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
