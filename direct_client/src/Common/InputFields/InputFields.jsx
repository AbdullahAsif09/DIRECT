import {
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility, Search, Quiz } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TooltipMui from "../AnimationMui/TooltipMui";
const LabelForInput = styled(FormLabel)(({ theme }) => ({
  color: "black",
  fontSize: "1.1rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}));

function InputFields({
  name,
  type,
  placeholder,
  label,
  required,
  rows,
  onBlur,
  onChange,
  error,
  helperText,
  value,
  disable,
  variant,
  tooltipText,
  labelDate,
  sx,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container rowGap={1}>
      <Grid item xs={12}>
        <Stack alignItems={"center"} direction={"row"} gap={1}>
          <LabelForInput
            color="error"
            required={required ? true : false}
            className="emailInputLabel"
          >
            {label}
          </LabelForInput>
          {tooltipText && (
            <TooltipMui
              text={tooltipText}
              icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
            />
          )}
        </Stack>
      </Grid>
      {type === "firstName" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            id={type}
            name={type}
            placeholder={placeholder}
            error={error}
            sx={sx}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
          />
        </Grid>
      )}
      {type === "text" && (
        <Grid item xs={12}>
          <TextField
            disabled={disable}
            fullWidth
            variant={variant ? variant : "outlined"}
            value={value}
            type="text"
            name={name}
            sx={sx}
            id={name}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
            placeholder={placeholder}
          />
        </Grid>
      )}
      {type === "number" && (
        <Grid item xs={12}>
          <TextField
            disabled={disable}
            fullWidth
            variant={variant ? variant : "outlined"}
            value={value}
            type={type}
            name={name}
            sx={sx}
            id={name}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
            placeholder={placeholder}
          />
        </Grid>
      )}
      {type === "lastName" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            sx={sx}
            variant="outlined"
            id={type}
            name={type}
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
          />
        </Grid>
      )}

      {type === "textbox" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={rows}
            value={value}
            variant="outlined"
            placeholder={placeholder}
            type={type}
            name={name}
            sx={sx}
            id={name}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
          />
        </Grid>
      )}
      {type === "email" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            sx={sx}
            id={type}
            name={type}
            // type={type}
            value={value}
            type="email"
            disabled={disable}
            required
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
          />
        </Grid>
      )}
      {type === "phone" && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id={type}
            type={"number"}
            fullWidth
            sx={sx}
            disabled={disable}
            value={value}
            name={type}
            placeholder={"03030000000"}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
          />
          {}
        </Grid>
      )}
      {type === "password" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            sx={sx}
            required
            name={type}
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            helperText={helperText}
            variant="outlined"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}
      {type === "confirmpassword" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            value={value}
            name={type}
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
            variant="outlined"
            sx={sx}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}
      {type === "focusarea" && (
        <TextField
          fullWidth
          required
          name={type}
          placeholder={placeholder}
          error={error}
          sx={sx}
          onBlur={onBlur}
          onChange={onChange}
          helperText={helperText}
          variant="outlined"
          id="outlined-adornment-password"
          type={""}
        />
      )}
      {type === "date" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            name={name}
            value={value}
            placeholder={placeholder}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            helperText={helperText}
            {...rest}
            label={labelDate}
          />
        </LocalizationProvider>
      )}
      {type === "search" && (
        <TextField
          type="search"
          fullWidth
          sx={sx}
          value={value}
          onChange={onChange}
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment sx={{ cursor: "pointer" }} position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Grid>
  );
}
export default InputFields;
