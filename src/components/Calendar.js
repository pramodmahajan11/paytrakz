import React, { useState } from "react";
import {
  Calendar,
  Modal,
  Form,
  Input,
  Button,
  TimePicker,
  Popover,
  Descriptions,
} from "antd";
import moment from "moment";
import { Dropdown } from "antd";
import { useRef } from "react";
import "../App.css";
import "./Calendar.css";
import EventBox from "./EventBox";

const CalendarPage = () => {
  const [events, setEvents] = useState({});
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [openPopoverDate, setOpenPopoverDate] = useState(null);

  const handlePopoverOpen = (dateString) => {
    setOpenPopoverDate(dateString);
  };

  const handlePopoverClose = () => {
    setOpenPopoverDate(null);
  };

  const handleDateClick = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    if (!events[dateString]) {
      setSelectedDate(value);
      setVisible(true);
    }
  };
  const timeFormated = (timeString) => {
    return `${String(timeString.$d.getHours() % 12 || 12).padStart(
      2,
      "0"
    )}:${String(timeString.$d.getMinutes()).padStart(2, "0")}:${
      timeString.$d.getHours() < 12 ? "AM" : "PM"
    }`;
  };

  const handleFormSubmit = (values) => {
    const { name, description, timeRange } = values;

    const times = {
      start: timeFormated(timeRange[0]),
      end: timeFormated(timeRange[1]),
    };

    const dateKey = selectedDate.format("YYYY-MM-DD");

    const newEvent = { name, description, times };
    setEvents({ ...events, [dateKey]: newEvent });

    setVisible(false);
    formRef.current.resetFields();
  };

  const cellRender = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    const event = events[dateString];

    return (
      <>
        {event && (
          <Popover
            content={() => {
              return (
                <>
                  <EventBox
                    name={event.name}
                    description={event.description}
                    start={event.times.start}
                    end={event.times.end}
                  />
                </>
              );
            }}
            title="Event Details"
            trigger="click"
            visible={openPopoverDate === dateString}
            onVisibleChange={(visible) => {
              if (visible) {
                handlePopoverOpen(dateString);
              } else {
                handlePopoverClose();
              }
            }}
          >
            <div className="events_details">
              <li className="events_item">{event.name}</li>
            </div>
          </Popover>
        )}
      </>
    );
  };

  console.log(events);

  return (
    <div className="App">
      <Modal
        title="Set Event"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form ref={formRef} onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="Event Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="timeRange"
            label="Event Time Range"
            rules={[
              { required: true, message: "Please select event time range" },
            ]}
          >
            <TimePicker.RangePicker
              format="hh:mm A"
              style={{ width: "100%" }}
              placeholder={["Start Time", "End Time"]}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Calendar onSelect={handleDateClick} dateCellRender={cellRender} />
    </div>
  );
};

export default CalendarPage;
