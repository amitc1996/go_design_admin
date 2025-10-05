import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "pages/layouts/PageLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createProject } from "api/project";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tab, setTab] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      base_price: "",
      description: "",
      addons: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addons",
  });

  const onCreateProject = async (data) => {
    try {
      await createProject(data);
      setSuccess("Project created successfully!");
      reset();
      navigate("/projects", { state: { successMessage: "Project created successfully!" } });
    } catch (err) {
      setError(err?.message || "Failed to create project");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Watch all addon fields to get dynamic type changes
  const addonFields = watch("addons");

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" mb={2}>
                Create New Project
              </MDTypography>

              <Tabs value={tab} onChange={handleTabChange}>
                <Tab label="Basic" />
                <Tab label="Addons" />
              </Tabs>

              <form onSubmit={handleSubmit(onCreateProject)}>
                {/* Basic Tab */}
                {tab === 0 && (
                  <MDBox mt={2}>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Project Name"
                          {...register("name", { required: "Project name is required" })}
                          error={Boolean(errors.name)}
                          helperText={errors.name?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Base Price"
                          type="number"
                          {...register("base_price", { required: "Base price is required" })}
                          error={Boolean(errors.base_price)}
                          helperText={errors.base_price?.message}
                        />
                      </Grid>
                    </Grid>

                    <MDBox mb={2}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        {...register("description")}
                      />
                    </MDBox>
                  </MDBox>
                )}

                {/* Addons / Form Builder Tab */}
                {tab === 1 && (
                  <MDBox mt={2}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      onClick={() =>
                        append({ field_name: "", type: "text", description: "", options: [] })
                      }
                    >
                      Add Field
                    </MDButton>

                    {fields.map((item, index) => {
                      const type = addonFields[index]?.type;

                      return (
                        <Grid container spacing={2} mt={1} key={item.id} alignItems="center">
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              label="Field Name"
                              {...register(`addons.${index}.field_name`, { required: "Required" })}
                              error={Boolean(errors.addons?.[index]?.field_name)}
                              helperText={errors.addons?.[index]?.field_name?.message}
                            />
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              select
                              label="Type"
                              SelectProps={{ native: true }}
                              {...register(`addons.${index}.type`, { required: "Required" })}
                              error={Boolean(errors.addons?.[index]?.type)}
                            >
                              <option value="text">Text</option>
                              <option value="button">Button</option>
                              <option value="select">Select</option>
                              <option value="radiobutton">Radio Button</option>
                              <option value="checkbox">Checkbox</option>
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Description"
                              {...register(`addons.${index}.description`)}
                            />
                          </Grid>

                          <Grid item xs={12} sm={2}>
                            <IconButton color="error" onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>

                          {/* Options for select, radio, checkbox */}
                          {(type === "select" || type === "radiobutton" || type === "checkbox") && (
                            <Grid item xs={12}>
                              <OptionsField
                                control={control}
                                index={index}
                                register={register}
                                errors={errors}
                              />
                            </Grid>
                          )}
                        </Grid>
                      );
                    })}
                  </MDBox>
                )}

                <MDBox display="flex" justifyContent="flex-end" mt={3}>
                  <MDButton type="submit" variant="gradient" color="info">
                    Create Project
                  </MDButton>
                </MDBox>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbars */}
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error"
        content={error}
        open={Boolean(error)}
        onClose={() => setError("")}
        close={() => setError("")}
      />
      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={success}
        open={Boolean(success)}
        onClose={() => setSuccess("")}
        close={() => setSuccess("")}
      />
    </PageLayout>
  );
}

// Component for dynamic options input
function OptionsField({ control, index, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `addons.${index}.options`,
  });

  return (
    <div>
      {fields.map((opt, optIndex) => (
        <Grid container spacing={1} key={opt.id} alignItems="center" mt={1}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label={`Option ${optIndex + 1}`}
              {...register(`addons.${index}.options.${optIndex}.value`, { required: "Required" })}
              error={Boolean(errors.addons?.[index]?.options?.[optIndex]?.value)}
              helperText={errors.addons?.[index]?.options?.[optIndex]?.value?.message}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="error" onClick={() => remove(optIndex)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <MDButton
        variant="outlined"
        color="secondary"
        onClick={() => append({ value: "" })}
        sx={{ mt: 1 }}
      >
        Add Option
      </MDButton>
    </div>
  );
}
