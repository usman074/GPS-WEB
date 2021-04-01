import React, { useEffect, useState } from "react";
import { IntervalContainer } from "./style";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Input } from "../common";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useIntervalContext } from "../../providers/IntervalProvider";
import { updateIntervalDocument, generateIntervalDocument } from "../../firebase";

export const IntervalScreen = () => {
  const [showDropdown, setShowDropdown] = useState({
    dropdownOne: { open: false, text: "hours" },
    dropdownTwo: { open: false, text: "hours" },
    dropdownThree: { open: false, text: "hours" },
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
      const intervalDoc = await generateIntervalDocument();
      dispatch({ type: "INITIALIZE_INTERVAL", payload: intervalDoc });
    }
    initializeIntervalDoc();
  },[])

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
      webpageInterval: {
        ...values.webpageInterval,
        type: showDropdown.dropdownThree.text,
      },
    };
    const intervalDoc = await updateIntervalDocument(updatedValues);
    dispatch({ type: "UPDATE_INTERVAL", payload: intervalDoc });
  };

  const validateSetIntervalForm = () => {
    return Yup.object({
      refreshInterval: Yup.object().shape({
        value: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      }),
      mapInterval: Yup.object().shape({
        start: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
        end: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      }),
      gpsInterval: Yup.object().shape({
        value: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      }),
      webpageInterval: Yup.object().shape({
        value: Yup.number()
          .typeError("required number")
          .positive("positive number")
          .required("Required"),
      }),
    });
  };
  return (
    <Formik
      initialValues={
        state.interval
          ? state.interval
          : {
              refreshInterval: {
                value: "",
              },
              mapInterval: {
                start: "",
                end: "",
              },
              gpsInterval: {
                value: "",
              },
              webpageInterval: {
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
              placeholder="5"
              type="text"
            />
            {dropdown("dropdownOne")}
          </div>
          <div className="interval-wrapper">
            <p>Update map intervel (between8:00 pm and 6:00 am)</p>
            <Input
              className="interval-input"
              name="mapInterval.start"
              placeholder="5"
              type="text"
              suffix={"am"}
            />
            {/* <p>
              5 <sub>am</sub>
            </p> */}
            <Input
              className="interval-input"
              name="mapInterval.end"
              placeholder="8"
              type="text"
              suffix={"pm"}
            />
            {/* <p>
              8 <sub>pm</sub>
            </p> */}
          </div>
          <div className="interval-wrapper">
            <p>interval for sending GPS data</p>

            <Input
              className="interval-input"
              name="gpsInterval.value"
              placeholder="5"
              type="text"
            />
            {dropdown("dropdownTwo")}
          </div>
          <div className="interval-wrapper">
            <p>Refresh Web Page Interval</p>
            <Input
              className="interval-input"
              name="webpageInterval.value"
              placeholder="5"
              type="text"
            />
            {dropdown("dropdownThree")}
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
