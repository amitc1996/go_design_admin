import { useEffect, useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "pages/layouts/PageLayout";
import DataTable from "examples/Tables/DataTable";

import { useForm } from "react-hook-form";
import projectCategoryApi from "services/projectCategoryApi";

export default function ProjectCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await projectCategoryApi.getCategories();
      setCategories(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Save or update category
  const handleSave = async (data) => {
    try {
      if (editingCategory) {
        await projectCategoryApi.updateCategory(editingCategory.id, { name: data.name });
        setSuccess("Category updated successfully!");
      } else {
        await projectCategoryApi.createCategory({ name: data.name });
        setSuccess("Category created successfully!");
      }
      setModalOpen(false);
      setEditingCategory(null);
      reset();
      fetchCategories();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to save category.";
      setError(msg);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await projectCategoryApi.deleteCategory(id);
        setSuccess("Category deleted successfully!");
        fetchCategories();
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to delete category.");
      }
    }
  };

  // ✅ Memoized columns & rows (to prevent infinite re-renders)
  const columns = useMemo(
    () => [
      { Header: "Category Name", accessor: "name", width: "80%" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        actions: (
          <MDBox display="flex" justifyContent="center" alignItems="center">
            <IconButton
              color="info"
              onClick={() => {
                setEditingCategory(cat);
                reset({ name: cat.name });
                setModalOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(cat.id)}>
              <DeleteIcon />
            </IconButton>
          </MDBox>
        ),
      })),
    [categories]
  );

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <MDButton
              variant="gradient"
              color="info"
              startIcon={<AddIcon />}
              onClick={() => {
                reset({ name: "" });
                setEditingCategory(null);
                setModalOpen(true);
              }}
            >
              Add Category
            </MDButton>
          </MDBox>
          <Card>
            <DataTable
              table={{ columns, rows }}
              isSorted
              entriesPerPage
              showTotalEntries
              noEndBorder
              canSearch
              isLoading={loading}
              emptyDataText="No categories found"
            />
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Add/Edit Category */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <Card style={{ width: "400px", maxWidth: 400, margin: "auto", padding: "20px" }}>
              <MDTypography variant="h6" mb={2}>
                {editingCategory ? "Edit Category" : "Add Category"}
              </MDTypography>
              <form onSubmit={handleSubmit(handleSave)}>
                <MDBox mb={2}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    {...register("name", { required: "Category name is required" })}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                </MDBox>
                <MDBox display="flex" justifyContent="flex-end" gap={1}>
                  <MDButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setModalOpen(false);
                      setEditingCategory(null);
                      reset();
                    }}
                  >
                    Cancel
                  </MDButton>
                  <MDButton type="submit" variant="gradient" color="info">
                    Save
                  </MDButton>
                </MDBox>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* Snackbars */}
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error"
        content={error}
        open={Boolean(error)}
        onClose={() => setError("")}
        close={() => setError("")}
        dateTime=""
      />
      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={success}
        open={Boolean(success)}
        onClose={() => setSuccess("")}
        close={() => setSuccess("")}
        dateTime=""
      />

      {/* Modal CSS */}
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1300;
        }
      `}</style>
    </PageLayout>
  );
}
