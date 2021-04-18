import React, { useEffect, useState } from "react";
import { IntervalContainer } from "./style";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Input } from "../common";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useIntervalContext } from "../../providers/IntervalProvider";
import { updateIntervalDocument, generateIntervalDocument, getIntervalDocument } from "../../firebase";
import Loader from "react-loader-spinner";

export const IntervalScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [showDropdown, setShowDropdown] = useState({
    dropdownOne: { open: false, text: "hours" },
    dropdownTwo: { open: false, text: "hours" },
  });
  const { state, dispatch } = useIntervalContext();

  const handleDropdown = (name) => {
    setShowDropdown({
      ...showDropdown,
      [name]: { ...showDropdown[name], open: !showDropdown[name].open },
    });
  };

  const handleDropdownChange = (name) => {
    setShowDropdown({
      ...showDropdown,
      [name]: {
        ...showDropdown[name],
        text: showDropdown[name].text === "hours" ? "min" : "hours",
        open: !showDropdown[name].open,
      },
    });
  };
  const dropdown = (dropdownName) => {
    return (
      <>
        <p>
          {showDropdown[dropdownName].text}
          <CaretDownOutlined
            className="dropdown-icon"
            onClick={() => handleDropdown(dropdownName)}
          />
          {showDropdown[dropdownName].open && (
            <p
              className="dropdown-list"
              onClick={() => handleDropdownChange(dropdownName)}
            >
              {showDropdown[dropdownName].text === "hours" ? "min" : "hours"}
            </p>
          )}
        </p>
      </>
    );
  };

  useEffect(()=> {
    const initializeIntervalDoc = async ()=> {
      const intervalDoc = await getIntervalDocument("123456789");
      dispatch({ type: "INITIALIZE_INTERVAL", payload: intervalDoc });
    }
    initializeIntervalDoc();
  },[])


  useEffect(()=> {
    if (state.interval) {
      setShowDropdown(
        {
          "dropdownOne": {...showDropdown["dropdownOne"], text: state.interval.refreshInterval.type},
          "dropdownTwo": {...showDropdown["dropdownTwo"], text: state.interval.gpsInterval.type}
        }
      )
    }
  },[state])

  const handleSetIntervalForm = async (values) => {
    const updatedValues = {
      ...values,
      refreshInterval: {
        ...values.refreshInterval,
        type: showDropdown.dropdownOne.text,
      },
      gpsInterval: {
        ...values.gpsInterval,
        type: showDropdown.dropdownTwo.text,
      },
    };
    setIsLoading(true)
    const intervalDoc = await updateIntervalDocument(updatedValues);
    dispatch({ type: "UPDATE_INTERVAL", payload: intervalDoc });
    setIsLoading(false)
  };

  const validateSetIntervalForm = () => {
    return Yup.object({
      refreshInterval: Yup.object().shape({
        value: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      }),
      gpsInterval: Yup.object().shape({
        value: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      })
    });
  };
  return (
    isLoading ? (
      <Loader
        type="Oval"
        color="#464646"
        height={100}
        width={100}
        visible={true}
      />
    ) :
    <Formik
      initialValues={
        state.interval
          ? state.interval
          : {
              refreshInterval: {
                value: "",
              },
              gpsInterval: {
                value: "",
              },
            }
      }
      validationSchema={validateSetIntervalForm}
      onSubmit={handleSetIntervalForm}
      enableReinitialize
    >
      <Form>
        <IntervalContainer>
          <div className="interval-wrapper">
            <p>Refresh interval</p>
            <Input
              className="interval-input"
              name="refreshInterval.value"
              placeholder="0"
              type="text"
            />
            {dropdown("dropdownOne")}
          </div>
          
          <div className="interval-wrapper">
            <p>interval for sending GPS data</p>

            <Input
              className="interval-input"
              name="gpsInterval.value"
              placeholder="0"
              type="text"
            />
            {dropdown("dropdownTwo")}
          </div>
          <Button
            type="submit"
            className="interval-save-button"
            name={"Save"}
          />
        </IntervalContainer>
      </Form>
    </Formik>
  );
};
