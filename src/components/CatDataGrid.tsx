import Cat from "@/types/Cat";
import { Alert, AlertTitle, Button, Collapse, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import CatViewDialog from "./CatViewDialog";
import { initFirebase } from "@/firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const CatDataGrid = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [catsList, setCatsList] = useState<Cat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat>({
    id: "",
    name: "",
    age: 1,
    breed: "",
    image: "",
  });
  const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState<string>("");
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState<boolean>(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleOpenModal = (cat: Cat) => {
    setIsModalOpen(true);
    setSelectedCat(cat);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCat({
      id: "",
      name: "",
      age: 1,
      breed: "",
      image: "",
    });
    setUploadImageFile(null);
    setUploadImageUrl("");
  };

  const handleUploadImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadImageFile(e.target.files[0]);
      setUploadImageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setUploadImageFile(null);
      setUploadImageUrl("");
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    const { id, name, age, breed } = selectedCat;
    formData.append("id", id!);
    formData.append("name", name);
    formData.append("age", age.toString());
    formData.append("breed", breed);
    if (uploadImageFile) {
      formData.append("image", uploadImageFile);
    }

    const token = await user?.getIdToken();
    const response = await fetch("http://localhost:10888/api/v1/cat/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      handleCloseModal();
      setIsSuccessAlertOpen(true);
      await fetchCats();
    } else {
      const res = await response.json();
      handleCloseModal();
      setIsErrorAlertOpen(true);
      setErrorMessage(res.message);
    }
  };

  const handleRemove = async () => {
    const { id } = selectedCat;

    const token = await user?.getIdToken();

    const response = await fetch("http://localhost:10888/api/v1/cat/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      handleCloseModal();
      await fetchCats();
    } else {
      const res = await response.json();
      handleCloseModal();
      setIsErrorAlertOpen(true);
      setErrorMessage(res.message);
    }
  };

  const gridRenderCellButton = (params: GridRenderCellParams) => {
    const handleViewCatDetailsClick = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      handleOpenModal({ ...params.row });
    };
    return (
      <Button onClick={handleViewCatDetailsClick} variant="contained">
        View
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Cat ID", flex: 1 },
    { field: "name", headerName: "Cat Name", flex: 1 },
    { field: "age", headerName: "Cat Age", flex: 1 },
    { field: "breed", headerName: "Cat Breed", flex: 1 },
    {
      field: "image",
      headerName: "Cat Image",
      flex: 1,
      renderCell: (parmas) => {
        return (
          <img
            src={parmas.row.image}
            alt={parmas.id as string}
            width={100}
            height={100}
          />
        );
      },
    },
    { field: "action", headerName: "View", renderCell: gridRenderCellButton },
  ];

  const fetchCats = async () => {
    setCatsList([]);
    const response = await fetch("http://localhost:10888/api/v1/cat");
    const catsData: Cat[] = await response.json();
    console.log({ catsData });
    setCatsList(catsData);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      <Collapse in={isSuccessAlertOpen}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setIsSuccessAlertOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Success</AlertTitle>
          Cat details is updated.
        </Alert>
      </Collapse>
      <Collapse in={isErrorAlertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setIsErrorAlertOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Collapse>
      <DataGrid
        rows={catsList}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 15, 25]}
        columnVisibilityModel={{
          id: false,
        }}
        rowHeight={100}
      />
      <CatViewDialog
        open={isModalOpen}
        cat={selectedCat}
        updateCat={setSelectedCat}
        handleClose={handleCloseModal}
        setUploadImageFile={setUploadImageFile}
        uploadImageUrl={uploadImageUrl}
        setUploadImageUrl={setUploadImageUrl}
        handleUploadImageChange={handleUploadImageChange}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default CatDataGrid;
