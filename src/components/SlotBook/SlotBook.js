import Calendar from "./Calendar";
import "./SlotBook.css";
const imgsrc =
  "https://s3-alpha-sig.figma.com/img/669d/4952/2621013222754f4180171d8d70e2a80a?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y1Ta~AJqEzbFNJ~3w~ybf~ttfpvjGVtGLlCsWpxpoHt3fVoBLPJbf-m3UrBE8x03jSuYfaYmo0m2IcBDpt4GtZdU3lMhdAeENJdslJUfV0LOG47lE6h1QZs6iq3LFgJjgWr4V1jsdk0WIn~RW32l-fYmaVKfxlTh~bi4JhkCBlQR7YcsEDEO2G~175EJTX0-vEmdij9aJSgNvGU9yKVkBACxv4MYJDBUjryCPTiKH86uegms9KxLEFLhBnqCKlwyW9VZrep3CdHHZrrtO5AXzJeMIFnV~bCMrxg2KfAvl6IV7PCJjMG1ghTdSR6g7wO4CjjB3FLFLE9kcNZmig1bMA__";
const SlotBook = () => {
  console.log(window.screen.height);
  console.log(window.screen.width);
  return (
    <>
      <div className="container slot_main">
        <div className="row slot_heading">
          <div className="col d-flex justify-content-center align-items-center slot_headingBox">
            <h1 className="text-center">
              SCHEDULE APPOIMENTS WITH EXPERTSD DOCTORS
            </h1>
          </div>
        </div>

        <div className="row d-flex justify-content-center align-items-center slot_mainBody">
          <div class="col">
            <div className="slot_mainBodyLeft">
              <img src={imgsrc} alt="svg" />
            </div>
          </div>
          <div class="col slot_mainBodyRight">
            {/* <div className="slot_mainBodyRight"> */}
            <Calendar />
            {/* </div> */}
          </div>
          <div className="slantdiv"></div>
        </div>
      </div>
    </>
  );
};

export default SlotBook;
