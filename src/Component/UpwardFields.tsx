import {
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  useId,
  ReactNode,
  useState,
  LegacyRef,
  TextareaHTMLAttributes,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import '../Style/design.css'
import { format } from "date-fns";
import { isValidDate } from "../Lib/validateDate";
import { wait } from "../Lib/wait";
import { flushSync } from "react-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface TextInputProps {
  input: InputHTMLAttributes<HTMLInputElement>;
  label: HtmlHTMLAttributes<HTMLLabelElement>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  icon?: ReactNode; // New prop for the icon
  iconPosition?: "start" | "end"; // New prop to choose icon position
  onIconClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  disableIcon?: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
  buttonStyle?:CSSProperties
  offValidation?:boolean
}

interface TextAreaPrps {
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: HtmlHTMLAttributes<HTMLLabelElement>;
  _inputRef: LegacyRef<HTMLTextAreaElement>;
  icon?: ReactNode; // New prop for the icon
  iconPosition?: "start" | "end"; // New prop to choose icon position
  onIconClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  disableIcon?: boolean;
  containerStyle?: CSSProperties;
  containerClassName?: string;
}

interface TextFormatedInputProps extends TextInputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
export function TextFormatedInput({
  input,
  label,
  inputRef,
  icon,
  iconPosition = "end", // Default position is 'end'
  disableIcon = false,
  onIconClick = (e) => {},
  onChange = (e) => {},
  onBlur = (e) => {},
  containerStyle,
  containerClassName,
}: TextFormatedInputProps) {
  // const [inputValue, setInputValue] = useState('');
  const id = useId();

  // Helper function to format numbers with commas
  const formatNumber = (value: string) => {
    if (!value) return value;

    // Split the value into integer and decimal parts
    const parts = value.split(".");

    // Add commas to the integer part only
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join the integer and decimal parts if decimal exists
    return parts.join(".");
  };

  // Helper function to remove commas
  const unformatNumber = (value: string) => {
    return value.replace(/,/g, "");
  };

  // Function to ensure two decimal places
  const ensureTwoDecimals = (value: string) => {
    // If the value has no decimal part, append '.00'
    if (!value.includes(".")) {
      if (value === "") {
        return "0.00";
      } else {
        return value + ".00";
      }
    }

    // If the value has one decimal place, append '0'
    const parts = value.split(".");
    if (parts[1].length === 1) {
      return value + "0";
    }

    // If it already has two decimal places, return as is
    return value;
  };

  const handleChange = (e: any) => {
    let value = e.target.value;

    // Remove commas for processing
    value = unformatNumber(value);

    // Allow only numbers, commas, and one decimal point
    const regex = /^-?\d+(,\d{3})*(\.\d*)?$/;

    // Remove commas for processing
    value = unformatNumber(value);

    // Check if the value is valid
    if (value === "" || regex.test(value)) {
      // Set the formatted value back in the input field
      //setInputValue(formatNumber(value));
      e.target.value = formatNumber(value);
    } else {
      const numbers = value.match(/\d+/g);
      if (numbers) {
        const newV = numbers.join("");
        e.target.value = formatNumber(newV);
      } else {
        e.target.value = "0";
      }
    }
  };

  const handleBlur = (e: any) => {
    let value = unformatNumber(e.target.value);

    // Ensure the value has two decimal places
    value = ensureTwoDecimals(value);

    // Set the value with commas and .00 (if needed)
    // setInputValue(formatNumber(value));
    e.target.value = formatNumber(value);
  };

  return (
    <div
      className={containerClassName}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        ...containerStyle, // Enable absolute positioning for icon
      }}
    >
      <label {...label} htmlFor={id}>
        {label.title}
      </label>
      {icon && iconPosition === "start" && (
        <div style={{ position: "absolute", left: "8px", zIndex: 1 }}>
          {icon}
        </div>
      )}
      <input
        ref={inputRef}
        id={id}
        {...input}
        type="text"
        style={{
          height: "100%",
          textAlign: "right",
          ...input.style,
        }}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
          onBlur(e);
        }} // Add .00 on blur
        onFocus={(e) => {
          e.currentTarget.select();
          if (input && input.onFocus) input.onFocus(e);
        }}
      />
      {icon && iconPosition === "end" && (
        <div
          onClick={onIconClick}
          style={{
            position: "absolute",
            right: "2px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: disableIcon ? "none" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            pointerEvents: disableIcon ? "none" : "auto",
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

export function TextInput({
  input,
  label,
  inputRef,
  icon,
  iconPosition = "end", // Default position is 'end'
  disableIcon = false,
  containerStyle,
  onIconClick = (e) => {},
  containerClassName,
  buttonStyle,
  offValidation = false
}: TextInputProps) {
  const id = useId();

  return (
    <div
      className={containerClassName}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        ...containerStyle,
      }}
    >
      <label {...label} htmlFor={id}>
        {label.title}
      </label>
      {icon && iconPosition === "start" && (
        <div style={{ position: "absolute", left: "8px", zIndex: 1 }}>
          {icon}
        </div>
      )}
      <input
        ref={inputRef}
        id={id}
        {...input}
        onBlur={(e) => {
          if(!offValidation){
    if (input.type === "month") {
            if (!isValidDate(`${e.currentTarget.value}-01`)) {
              alert(
                `Invalid ${label.title
                  ?.replace(/:/g, "")
                  .trim()}!, Resetting date.`
              );
              e.currentTarget.value = format(new Date(), "yyyy-MM");
              wait(100).then(() => {
                inputRef?.current?.focus();
              });
              return;
            }
          }
          if (input.type === "date") {
            if (!isValidDate(e.currentTarget.value)) {
              alert(
                `Invalid ${label.title
                  ?.replace(/:/g, "")
                  .trim()}!, Resetting date.`
              );
              e.currentTarget.value = format(new Date(), "yyyy-MM-dd");
              wait(100).then(() => {
                inputRef?.current?.focus();
              });
              return;
            }
          }
          }
      
          if (input && input.onBlur) input.onBlur(e);
        }}
        style={{
          height: "100%",
          ...input.style,
        }}
      />
      {icon && iconPosition === "end" && (
        <div
          onClick={onIconClick}
          style={{
            position: "absolute",
            right: "2px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: disableIcon ? "none" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            pointerEvents: disableIcon ? "none" : "auto",
            ...buttonStyle
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

export function TextAreaInput({
  containerClassName,
  textarea,
  label,
  _inputRef,
  icon,
  iconPosition = "end", // Default position is 'end'
  disableIcon = false,
  onIconClick = (e) => {},
  containerStyle,
}: TextAreaPrps) {
  const id = useId();

  return (
    <div
      className={containerClassName}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        ...containerStyle, // Enable absolute positioning for icon
      }}
    >
      <label {...label} htmlFor={id}>
        {label.title}
      </label>
      {icon && iconPosition === "start" && (
        <div style={{ position: "absolute", left: "8px", zIndex: 1 }}>
          {icon}
        </div>
      )}
      <textarea
        ref={_inputRef}
        id={id}
        {...textarea}
        style={{
          height: "100%",
          ...textarea.style,
        }}
      />
      {icon && iconPosition === "end" && (
        <div
          onClick={onIconClick}
          style={{
            position: "absolute",
            right: "2px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            cursor: disableIcon ? "none" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            pointerEvents: disableIcon ? "none" : "auto",
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

export const SelectInput = forwardRef(
  (
    {
      select,
      label,
      selectRef,
      datasource = [],
      values = "",
      display = "",
      containerStyle,
      containerClassName,
    }: {
      selectRef?: React.RefObject<HTMLSelectElement | null>;
      labelRef?: React.RefObject<HTMLLabelElement>;
      select: InputHTMLAttributes<HTMLSelectElement>;
      label: HtmlHTMLAttributes<HTMLLabelElement>;
      datasource: Array<any>;
      values: string;
      display: string;
      containerStyle?: React.CSSProperties | undefined;
      containerClassName?: string;
    },
    ref: any
  ) => {
    const [_datasource, _setDataSource] = useState(datasource);
    const id = useId();

    useImperativeHandle(ref, () => ({
      setDataSource: (_dataSource: any) => {
        _setDataSource(_dataSource);
      },
      getDataSource: () => {
        return _datasource;
      },
    }));

    return (
      <div
        className={containerClassName}
        style={{
          display: "flex",
          height: "18px",
          alignItems: "center",
          ...containerStyle,
        }}
      >
        <label {...label} htmlFor={id}>
          {label.title}
        </label>
        <select
          {...select}
          ref={selectRef}
          className={`select ${select.className}`}
          style={{
            height: "18px",
            ...select.style,
          }}
        >
          {_datasource.map((itm, idx) => {
            return (
              <option key={idx} value={itm[values]}>
                {itm[display]}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);


export function ButtonField({
  buttonRetRef,
  button,
  tooltipText = "",
  children,
  disabled = false,
}: {
  buttonRetRef?: React.RefObject<HTMLButtonElement>;
  button: HtmlHTMLAttributes<HTMLButtonElement>;
  tooltipText: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="tooltip">
      <button
        disabled={disabled}
        {...button}
        ref={buttonRetRef}
        style={{
          ...button.style,
          cursor: "pointer",
          background: !disabled ? "transparent" : "#f1f1f1",
        }}
        className="tooltip-button"
      >
        {children}
      </button>
      {!disabled && <span className="tooltip-text">{tooltipText}</span>}
    </div>
  );
}
export const Autocomplete = forwardRef(
  (
    {
      DisplayMember,
      DataSource: _DataSource,
      inputRef,
      disableInput = false,
      onKeydown,
      onChange,
      label = {
        title: "Transaction : ",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          width: "100px",
        },
      },
      input = {
        width: "740px",
      },
      containerStyle,
    }: any,
    ref: any
  ) => {
    const [DataSource, setDataSource] = useState(_DataSource);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    // Ref to store the suggestion container
    const suggestionListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      // Scroll the active suggestion into view
      const activeElement =
        suggestionListRef.current?.children[activeSuggestionIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [activeSuggestionIndex]);

    const handleChange = (e: any) => {
      const value = e.target.value;

      if (value.trim()) {
        const filtered = DataSource.filter((item: any) =>
          item[DisplayMember].toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const handleClick = (suggestion: any) => {
      setShowSuggestions(false);
    };

    const handleKeyDown = (e: any) => {
      if (e.key === "Tab") {
        flushSync(() => {
          setShowSuggestions(false);
          setFilteredSuggestions([]);
        });
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredSuggestions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        if (filteredSuggestions.length > 0) {
          const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
          onChange(selectedSuggestion, e);
          setShowSuggestions(false);
        }
      }

      setTimeout(() => {
        if (onKeydown) onKeydown(e);
      }, 150);
    };

    useImperativeHandle(ref, () => ({
      setDataSource: (newDataSource: Array<any>) => {
        setDataSource(newDataSource);
      },
    }));

    return (
      <div style={{ width: "100%" }}>
        <TextInput
          containerClassName="custom-input"
          containerStyle={containerStyle}
          label={label}
          input={{
            ...input,
            disabled: disableInput,
            type: "text",
            onKeyDown: handleKeyDown,
            onChange: handleChange,
            onFocus: (e) => {
              e.preventDefault();
              e.currentTarget?.focus();
              setShowSuggestions(true);
              setFilteredSuggestions(DataSource);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            },
            onBlur: (e) => {
              if (e.relatedTarget && e.relatedTarget.tagName === "LI") {
                wait(250).then(() => {
                  setShowSuggestions(false);
                  setFilteredSuggestions([]);
                });
              } else {
                setShowSuggestions(false);
                setFilteredSuggestions([]);
              }
            },
          }}
          icon={<KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />}
          onIconClick={(e) => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          inputRef={inputRef}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions" ref={suggestionListRef}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                tabIndex={0}
                key={index}
                onClick={(e) => {
                  handleClick(suggestion);
                  onChange(suggestion, e);
                }}
                className={index === activeSuggestionIndex ? "active" : ""}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setActiveSuggestionIndex(
                    Math.min(index, filteredSuggestions.length - 1)
                  );
                }}
              >
                {suggestion[DisplayMember]}
              </li>
            ))}
          </ul>
        )}
        <style>
          {`
          .suggestions {
            margin-top: 0;
            padding: 0;
            list-style: none;
            max-height: 150px;
            overflow-y: auto;
            position:absolute;
            z-index:100;
            background:white;
            width:350px;
            border:1px solid #e5e7eb;
            box-shadow: 0px 23px 32px -17px rgba(0,0,0,0.75);
          }
          .suggestions li {
            padding:3px 10px;
            cursor: pointer;
            font-size:14px;
          }
          .suggestions li.active {
            background-color: #e2e8f0;
          }
      
        `}
        </style>
      </div>
    );
  }
);
export const AutocompleteNumber = forwardRef(
  (
    {
      DisplayMember,
      DataSource: _DataSource,
      inputRef,
      disableInput = false,
      onKeydown,
      onChange,
      label = {
        title: "Transaction : ",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          width: "100px",
        },
      },
      input = {
        width: "740px",
      },
      containerStyle,
    }: any,
    ref: any
  ) => {
    const [DataSource, setDataSource] = useState(_DataSource);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    // Ref to store the suggestion container
    const suggestionListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      // Scroll the active suggestion into view
      const activeElement =
        suggestionListRef.current?.children[activeSuggestionIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [activeSuggestionIndex]);

    const handleClick = (suggestion: any) => {
      setShowSuggestions(false);
    };

    const handleKeyDown = (e: any) => {
      if (e.key === "Tab") {
        flushSync(() => {
          setShowSuggestions(false);
          setFilteredSuggestions([]);
        });
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredSuggestions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        if (filteredSuggestions.length > 0) {
          const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
          onChange(selectedSuggestion, e);
          setShowSuggestions(false);
        }
      }

      setTimeout(() => {
        if (onKeydown) onKeydown(e);
      }, 150);
    };

    const formatNumber = (value: string) => {
      if (!value) return value;

      // Split the value into integer and decimal parts
      const parts = value.split(".");

      // Add commas to the integer part only
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Join the integer and decimal parts if decimal exists
      return parts.join(".");
    };

    // Helper function to remove commas
    const unformatNumber = (value: string) => {
      return value.replace(/,/g, "");
    };

    // Function to ensure two decimal places
    const ensureTwoDecimals = (value: string) => {
      // If the value has no decimal part, append '.00'
      if (!value.includes(".")) {
        if (value === "") {
          return "0.00";
        } else {
          return value + ".00";
        }
      }

      // If the value has one decimal place, append '0'
      const parts = value.split(".");
      if (parts[1].length === 1) {
        return value + "0";
      }

      // If it already has two decimal places, return as is
      return value;
    };

    const handleChange = (e: any) => {
      let value = e.target.value;

      // Remove commas for processing
      value = unformatNumber(value);

      // Allow only numbers, commas, and one decimal point
      const regex = /^-?\d+(,\d{3})*(\.\d*)?$/;

      // Remove commas for processing
      value = unformatNumber(value);

      // Check if the value is valid
      if (value === "" || regex.test(value)) {
        // Set the formatted value back in the input field
        //setInputValue(formatNumber(value));
        e.target.value = formatNumber(value);
      } else {
        const numbers = value.match(/\d+/g);
        if (numbers) {
          const newV = numbers.join("");
          e.target.value = formatNumber(newV);
        } else {
          e.target.value = "0";
        }
      }

      filterOnChange(e.target.value);
    };

    const filterOnChange = (value: any) => {
      if (value.trim()) {
        const filtered = DataSource.filter((item: any) =>
          item[DisplayMember].toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const formatOnBlur = (value: any, e: any) => {
      let newValue = unformatNumber(value);

      // Ensure the value has two decimal places
      newValue = ensureTwoDecimals(newValue);

      // Set the value with commas and .00 (if needed)
      // setInputValue(formatNumber(value));
      e.target.value = formatNumber(newValue);
    };

    useImperativeHandle(ref, () => ({
      setDataSource: (newDataSource: Array<any>) => {
        setDataSource(newDataSource);
      },
    }));

    return (
      <div style={{ flex: 1 }}>
        <TextInput
          containerStyle={containerStyle}
          label={label}
          input={{
            ...input,
            disabled: disableInput,
            type: "text",
            onKeyDown: handleKeyDown,
            onChange: handleChange,
            onFocus: (e) => {
              e.preventDefault();
              e.currentTarget?.focus();
              setShowSuggestions(true);
              setFilteredSuggestions(DataSource);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            },
            onBlur: (e) => {
              formatOnBlur(e.currentTarget.value, e);
              if (e.relatedTarget && e.relatedTarget.tagName === "LI") {
                wait(250).then(() => {
                  setShowSuggestions(false);
                  setFilteredSuggestions([]);
                });
              } else {
                setShowSuggestions(false);
                setFilteredSuggestions([]);
              }
            },
          }}
          icon={<KeyboardArrowDownIcon sx={{ fontSize: "18px" }} />}
          onIconClick={(e) => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          inputRef={inputRef}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions" ref={suggestionListRef}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                tabIndex={0}
                key={index}
                onClick={(e) => {
                  handleClick(suggestion);
                  onChange(suggestion, e);
                }}
                className={index === activeSuggestionIndex ? "active" : ""}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setActiveSuggestionIndex(
                    Math.min(index, filteredSuggestions.length - 1)
                  );
                }}
              >
                {suggestion[DisplayMember]}
              </li>
            ))}
          </ul>
        )}
        <style>
          {`
          .suggestions {
            margin-top: 0;
            padding: 0;
            list-style: none;
            max-height: 150px;
            overflow-y: auto;
            position:absolute;
            z-index:100;
            background:white;
            width:350px;
            border:1px solid #e5e7eb;
            box-shadow: 0px 23px 32px -17px rgba(0,0,0,0.75);
          }
          .suggestions li {
            padding:3px 10px;
            cursor: pointer;
            font-size:14px;
          }
          .suggestions li.active {
            background-color: #e2e8f0;
          }
      
        `}
        </style>
      </div>
    );
  }
);
export const AutoCompletePro = forwardRef(
  (
    { containerStyle, label, inputRef, onChange, onKeydown, disableInput }: any,
    ref
  ) => {
    const listid = useId();
    const [options, setOptions] = useState<Array<any>>([]);

    // Handle selection
    const handleChange = (e: any) => {
      const value = e.target.value;

      // Find the matching object
      const match = options.find((item: any) => item.Purpose === value);
      onChange(e, match);
    };

    useImperativeHandle(ref, () => ({
      setDataSource: (data: Array<any>) => {
        setOptions(data);
      },
    }));

    return (
      <>
        <TextInput
          containerClassName="custom-input"
          containerStyle={containerStyle}
          label={label}
          input={{
            disabled: disableInput,
            list: listid,
            type: "text",
            onChange: handleChange,
            onKeyDown: onKeydown,
            style: {
              width: "calc(100% - 80px)",
            },
          }}
          inputRef={inputRef}
        />

        <datalist id={listid}>
          {options.map((item: any, index) => (
            <option key={index} value={item.Purpose} />
          ))}
        </datalist>
      </>
    );
  }
);
