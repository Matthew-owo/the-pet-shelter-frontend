import Cat from "@/types/Cat";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type CatViewDialogType = {
  open: boolean;
  cat: Cat;
  updateCat: Dispatch<SetStateAction<Cat>>;
  handleClose: () => void;
  setUploadImageFile: Dispatch<SetStateAction<File | null>>;
  uploadImageUrl: string;
  setUploadImageUrl: Dispatch<SetStateAction<string>>;
  handleUploadImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => Promise<void>;
  handleRemove: () => Promise<void>;
};

const CatViewDialog: React.FC<CatViewDialogType> = ({
  open,
  cat,
  updateCat,
  handleClose,
  setUploadImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  handleUploadImageChange,
  handleUpdate,
  handleRemove,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Cat Details - {cat.name}</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2} mt={2}>
          <TextField
            id="id"
            label="Cat ID (Read Only)"
            value={cat.id}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            id="name"
            label="Cat Name"
            value={cat.name}
            onChange={(e) => updateCat({ ...cat, name: e.target.value })}
            fullWidth
          />
          <TextField
            type="number"
            id="age"
            label="Cat Age"
            value={cat.age}
            onChange={(e) => updateCat({ ...cat, age: Number(e.target.value) })}
            InputProps={{ inputProps: { min: 1, max: 99 } }}
            fullWidth
          />
          <TextField
            id="breed"
            label="Cat Breed"
            value={cat.breed}
            onChange={(e) => updateCat({ ...cat, breed: e.target.value })}
            fullWidth
          />
          <Divider />
          <Typography variant="h6" color="text.secondary">
            Cat Image
          </Typography>
          {uploadImageUrl ? (
            <>
              <Typography variant="body1" color="error">
                NEW
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setUploadImageUrl("");
                  setUploadImageFile(null);
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            ""
          )}
          <img
            src={uploadImageUrl ? uploadImageUrl : cat.image}
            alt={cat.id as string}
            height={350}
            width={300}
          />
          <TextField
            type="file"
            id="image"
            onChange={handleUploadImageChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={handleUpdate}>
          Update
        </Button>
        <Button color="error" onClick={handleRemove}>
          Remove
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatViewDialog;
