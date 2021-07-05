import "../router/testcomponent.style.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import GonogoTest from "../gonogo-test/starttest.component";
const ButtonGonogoTest = () => {
  useEffect(() => {
    document.getElementById("button").addEventListener("click", StartTest);
  }, []);

  const [show, setShow] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [setting, setSetting] = useState([]);
  let input = {
    numberOfArraySample: "",
    t: 1000,
    isi: 1000,
    target: "پ",
    s: [1, 1, 1, 100, 100, 2, 1, 0, 100, 2, 100, 2, 1, 2, 100],
    mode: "Demo",
  };
  const getSettingFromUser = (event) => {
    input.s.map((item, index) => {
      if (item === 0) {
        input.s.splice(index, 1, "ث");
      }
      if (item === 1) {
        input.s.splice(index, 1, "ب");
      }
      if (item === 2) {
        input.s.splice(index, 1, "ت");
      }
      if (item === 100) {
        input.s.splice(index, 1, "پ");
      }
    });
    console.log(input.s);
    input.s.push(null);
    event.preventDefault();
    const Elements = event.target.elements;
    for (const iterator of Elements) {
      console.log(iterator.value);
      if (
        iterator.value !== "" &&
        iterator.name !== "target" &&
        iterator.value > 20
      ) {
        input[iterator.name] = parseInt(iterator.value);
      }
      if (iterator.value !== "" && iterator.name === "target") {
        input[iterator.name] = iterator.value;
      }
      if (document.getElementById("radio1").checked) {
        let radio_value1 = document.getElementById("radio1").value;
        input.mode = radio_value1;
      }
      if (document.getElementById("radio2").checked) {
        let radio_value2 = document.getElementById("radio2").value;
        input.mode = radio_value2;
      }
      if (iterator.name === "numberOfArraySample") {
        let valueNumberOfArraySample = iterator.value;
        if (valueNumberOfArraySample > input.s.length) {
          input.s.map((item) => {
            while (input.s.length <= valueNumberOfArraySample) {
              input.s.push(item);
            }
          });
        }
        if (
          valueNumberOfArraySample < input.s.length &&
          valueNumberOfArraySample !== ""
        ) {
          input.s.splice(valueNumberOfArraySample);
        }
      }
    }
    if (setting.length === 0) {
      const tempSetting = setting;
      tempSetting.push(input);
      setSetting(tempSetting);
    }
  };
  const StartTest = () => {
    setShowComponent(true);
    console.log(setting[0].s);
  };
  return (
    <>
      {showComponent === false ? (
        <>
          <section className="sectionStartTest">
            <div className="container">
              <div className="row featureRow">
                <div className="offset-2 col-8">
                  <div className="jumbotron featurejumbotron fontfa">
                    <div className="container">
                      <Button
                        variant="primary"
                        className=" offset-3 col-6 py-3 mt-5"
                        onClick={handleShow}
                      >
                        تنظیمات
                      </Button>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        animation={true}
                      >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body className="textModal fontfa">
                          <Form onSubmit={getSettingFromUser}>
                            <Form.Group controlId="formBasicNumberOfElement">
                              <Form.Label>تعداد مجموعه محرک‌ها</Form.Label>
                              <Form.Control
                                type="number"
                                value={setting.numberOfArraySample}
                                name="numberOfArraySample"
                                min="20"
                              />
                            </Form.Group>
                            <Form.Group controlId="formBasicTimeShow">
                              <Form.Label> زمان نمایش محرک‌ها</Form.Label>
                              <InputGroup className="mb-3 ">
                                <Form.Control
                                  type="number"
                                  value={setting.t}
                                  name="t"
                                  placeholder="به عنوان مثال هزار میلی‌ثانیه"
                                  className="textModal"
                                  min="20"
                                />
                                <InputGroup.Append>
                                  <InputGroup.Text>ms</InputGroup.Text>
                                </InputGroup.Append>
                              </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="formBasicTimeRest">
                              <Form.Label> فاصله بین محرک‌ها</Form.Label>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  type="number"
                                  value={setting.isi}
                                  name="isi"
                                  placeholder="به عنوان مثال هزار میلی‌ثانیه"
                                  className="textModal"
                                  min="20"
                                />
                                <InputGroup.Append>
                                  <InputGroup.Text>ms</InputGroup.Text>
                                </InputGroup.Append>
                              </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelectTarget">
                              <Form.Label> انتخاب کاراکتر</Form.Label>
                              <Form.Control
                                type="text"
                                name="target"
                                value={setting.target}
                              />
                              <Form.Text className="text-muted">
                                .از بین حروف الفبا، یک حرف را وارد کنید
                              </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formSelect">
                              <Form.Label> : انتخاب حالت</Form.Label>
                              {["radio"].map((type) => (
                                <div
                                  key={`default-${type}`}
                                  className="mb-3 mx-2"
                                  style={{ textAlign: "left" }}
                                >
                                  <Form.Check
                                    name="mode"
                                    value="demo"
                                    label="demo"
                                    type={type}
                                    id="radio1"
                                  />
                                  <Form.Check
                                    name="mode"
                                    value="test"
                                    type={type}
                                    label="test"
                                    id="radio2"
                                  />
                                </div>
                              ))}
                            </Form.Group>
                            <hr />
                            <Button variant="secondary" onClick={handleClose}>
                              بستن
                            </Button>
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={handleClose}
                              className="ml-3"
                            >
                              ذخیره
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                      <div className="fontfa">
                        <div className="text">
                          <button
                            className="btn btn-primary col-md-6 col-6 py-3 mb-5"
                            type="button"
                            id="button"
                          >
                            {" "}
                            <h6 className="linkstyle">شروع آزمون</h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : showComponent === true ? (
        <>
          <GonogoTest
            t={setting[0].t}
            isi={setting[0].isi}
            target={setting[0].target}
            s={setting[0].s}
            mode={setting[0].mode}
          />
        </>
      ) : null}
    </>
  );
};
export default ButtonGonogoTest;
