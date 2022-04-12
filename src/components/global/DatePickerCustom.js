import React, { useState } from "react";
import { Pressable, Image } from "react-native";
import DatePicker from "react-native-date-picker";
import tw from "twrnc";

const DatePickerCustom = ({ setNeedDate, func }) => {
  const date = new Date();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={tw`ml-1`}>
        <Image
          source={require("../../../assets/calendar.png")}
          resizeMode="contain"
          style={tw`w-8 h-8 ml-2`}
        />
      </Pressable>
      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={(dateF) => {
          setOpen(false);
          const year = dateF.getFullYear();
          const month = dateF.getMonth() + 1;
          const day = dateF.getDate();
          const validMonth = month < 10 ? `0${month}` : month;
          const validDay = day < 10 ? `0${day}` : day;
          const date_today = `${year}-${validMonth}-${validDay}`;
          setNeedDate(date_today);
          func ? func() : null;
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerCustom;
