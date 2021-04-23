import React, { useEffect, useState } from "react";
import { IntervalContainer } from "./style";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Input } from "../common";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useIntervalContext } from "../../providers/IntervalProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import {
  updateIntervalDocument,
  getIntervalDocument,
} from "../../firebase";
import {English, German} from '../../language.json';
import Loader from "react-loader-spinner";

export const IntervalScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state: authState } = useAuthContext();

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

  useEffect(() => {
    const initializeIntervalDoc = async () => {
      const intervalDoc = await getIntervalDocument("123456789");
      dispatch({ type: "INITIALIZE_INTERVAL", payload: intervalDoc });
    };
    initializeIntervalDoc();
  }, []);

  useEffect(() => {
    if (state.interval) {
      setShowDropdown({
        dropdownOne: {
          ...showDropdown["dropdownOne"],
          text: state.interval.refreshInterval.type,
        },
        dropdownTwo: {
          ...showDropdown["dropdownTwo"],
          text: state.interval.gpsInterval.type,
        },
      });
    }
  }, [state]);

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
    setIsLoading(true);
    const intervalDoc = await updateIntervalDocument(updatedValues);
    dispatch({ type: "UPDATE_INTERVAL", payload: intervalDoc });
    setIsLoading(false);
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
    });
  };
  return isLoading ? (
    <Loader
      type="Oval"
      color="#464646"
      height={100}
      width={100}
      visible={true}
    />
  ) : (
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
              mapInterval: {
                start: "",
                end: "",
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
            <p>{authState.user?.language === 'English'? English.REFRESH_INTERVAL: German.REFRESH_INTERVAL}</p>
            <Input
              className="interval-input"
              name="refreshInterval.value"
              type="text"
            />
            {dropdown("dropdownOne")}
          </div>

          <div className="interval-wrapper">
            <p>{authState.user?.language === 'English'? English.UPDATE_MAP_INTERVAL: German.UPDATE_MAP_INTERVAL}</p>
            <Input
              className="interval-input"
              name="mapInterval.start"
              type="text"
              suffix={"am"}
            />

            <Input
              className="interval-input"
              name="mapInterval.end"
              type="text"
              suffix={"pm"}
            />
          </div>

          <div className="interval-wrapper">
            <p>{authState.user?.language === 'English'? English.INTERVAL_FOR_SENDING_GPS_DATA: German.INTERVAL_FOR_SENDING_GPS_DATA}</p>

            <Input
              className="interval-input"
              name="gpsInterval.value"
              type="text"
            />
            {dropdown("dropdownTwo")}
          </div>
          <Button
            type="submit"
            className="interval-save-button"
            name={authState.user?.language === 'English'? English.SAVE: German.SAVE}
          />
        </IntervalContainer>
      </Form>
    </Formik>
  );
};
