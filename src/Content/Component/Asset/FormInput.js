// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../Pages/FormInput.css";

// const FormInput = (props) => {
//   const [focused, setFocused] = useState(false);
//   const { label, errorMessage, onChange, id, ...inputProps } = props;

//   const handleFocus = (e) => {
//     setFocused(true);
//   };

//   return (
//     <>
//     <div className="formInput">
//       <label className="formlabel">{label}</label>
//       <input
//         className="forminput"
//         {...inputProps}
//         onChange={onChange}
//         onBlur={handleFocus}
//         onFocus={() =>
//           inputProps.name === "confirmPassword" && setFocused(true)
//         }
//         focused={focused.toString()}
//       />
//       <span className="error">{errorMessage}</span>
//     </div>

    
//   </>
//   );
// };

// export default FormInput;
