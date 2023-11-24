"use client";
import { useState, useEffect, useMemo } from "react";
import Freecurrencyapi as any from "@everapi/freecurrencyapi-js";
import Input from "./components/Input";
import Swap from "./components/Swap";

export default function Home() {
  const [firstInputValue, setFirstInputValue] = useState((0).toFixed(2));
  const [secondInputValue, setSecondInputValue] = useState((0).toFixed(2));
  const [dropdownItems, setDropdownItems] = useState([]);
  const [firstSelectedItem, setFirstSelectedItem] = useState("USD");
  const [secondSelectedItem, setSecondSelectedItem] = useState("BRL");
  const [ratioAToB, setRatioAToB] = useState(1);
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_2BfamgkCKYkUwdVQfWvgtpfFfhLzy6EDcfzhYKFZ",
  );

  const handleSwap = () => {
    const tempSelectedItem = firstSelectedItem;
    setFirstSelectedItem(secondSelectedItem);
    setSecondSelectedItem(tempSelectedItem);
  };

  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstInputValue(parseFloat(e.target.value).toFixed(2));
    setSecondInputValue(Math.floor(e.target.value * ratioAToB).toFixed(2));
  };

  const handleFirstDropDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setFirstSelectedItem(e.target.textContent);
  };

  const handleSecondDropDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSecondSelectedItem(e.target.textContent);
  };

  useMemo(() => {
    try {
      freecurrencyapi.currencies().then(({ data }: any) => {
        if (data) {
          Object?.entries(data).map((item: any) => {
            // @ts-ignore
            if (!dropdownItems.includes(item[0])) dropdownItems.push(item[0]);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [dropdownItems, freecurrencyapi]);

  useEffect(() => {
    try {
      freecurrencyapi
        .latest({
          base_currency: firstSelectedItem,
          currencies: secondSelectedItem,
        })
        .then(({ data }: any) => {
          setRatioAToB(data[secondSelectedItem]);
          setSecondInputValue(
            Math.floor(
              parseFloat(firstInputValue) * data[secondSelectedItem],
            ).toFixed(2),
          );
        });
    } catch (error) {
      console.error(error);
    }
  }, [firstSelectedItem, secondSelectedItem, freecurrencyapi]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-black w-64 text-center mb-56">
        Currency Converter
      </h1>
      <div className="flex flex-col items-center gap-5">
        <Input
          value={firstInputValue}
          onChange={handleFirstInputChange}
          dropdownItems={dropdownItems}
          selectedItem={firstSelectedItem}
          onDropdownChange={handleFirstDropDown}
        />
        <Swap onClick={handleSwap} />
        <Input
          value={secondInputValue}
          onChange={() => {}}
          dropdownItems={dropdownItems}
          selectedItem={secondSelectedItem}
          onDropdownChange={handleSecondDropDown}
          disabled={true}
        />
      </div>
    </main>
  );
}
