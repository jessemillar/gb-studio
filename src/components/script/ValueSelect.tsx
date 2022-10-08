import { VariableSelect } from "components/forms/VariableSelect";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { NumberInput } from "ui/form/NumberInput";

type ScriptValue =
  | {
      type: "number";
      value: number;
    }
  | {
      type: "variable";
      value: string;
    }
  | {
      type: "expression";
      value: string;
    }
  | {
      type: "add";
      valueA?: ScriptValue;
      valueB?: ScriptValue;
    }
  | {
      type: "sub";
      valueA?: ScriptValue;
      valueB?: ScriptValue;
    }
  | {
      type: "mul";
      valueA?: ScriptValue;
      valueB?: ScriptValue;
    }
  | {
      type: "div";
      valueA?: ScriptValue;
      valueB?: ScriptValue;
    };

const Wrapper = styled.div`
  display: flex;
`;

const OperatorWrapper = styled.div`
  padding: 0 5px;
`;

interface ValueWrapperProps {
  hover?: boolean;
}

const ValueWrapper = styled.div<ValueWrapperProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  //   border-radius: 100px;
  //   //   background: rgba(0, 0, 0, 0.1);
  //   border-left: 1px solid #ccc;
  //   border-right: 1px solid #ccc;

  //   :hover {
  //     background: rgba(0, 0, 0, 0.1);
  //   }
`;

const FunctionWrapper = styled.div<ValueWrapperProps>`
  display: flex;
  align-items: center;
  padding: 0px 5px;
  border-radius: 8px;
  flex-grow: 1;

  //   background: rgba(0, 0, 0, 0.1);
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;

  ${(props) =>
    props.hover
      ? css`
          background: #eee;
        `
      : ""}
`;

export const isScriptValue = (value: unknown): value is ScriptValue => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const scriptValue = value as ScriptValue;
  // Is a number
  if (scriptValue.type === "number" && typeof scriptValue.value === "number") {
    return true;
  }
  if (
    scriptValue.type === "variable" &&
    typeof scriptValue.value === "string"
  ) {
    return true;
  }
  if (
    scriptValue.type === "expression" &&
    typeof scriptValue.value === "string"
  ) {
    return true;
  }
  if (
    scriptValue.type === "add" &&
    (isScriptValue(scriptValue.valueA) || !scriptValue.valueA) &&
    (isScriptValue(scriptValue.valueB) || !scriptValue.valueB)
  ) {
    return true;
  }

  return false;
};

interface ValueSelectProps {
  name: string;
  entityId: string;
  value?: ScriptValue;
  onChange: (newValue: ScriptValue | undefined) => void;
  innerValue?: boolean;
}

const ValueSelect = ({
  name,
  entityId,
  value,
  onChange,
  innerValue,
}: ValueSelectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  if (!value) {
    return (
      <div
        style={{
          background: "#ccc",
          borderRadius: 4,
        }}
      >
        ADD VALUE
      </div>
    );
  }

  let input: JSX.Element | null = null;
  if (value.type === "number") {
    input = (
      <ValueWrapper
        hover={isHovered}
        onMouseOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(true);
        }}
        onMouseOut={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <NumberInput
          id={name}
          type="number"
          value={String(
            value.value !== undefined && value.value !== null ? value.value : ""
          )}
          // min={field.min}
          // max={field.max}
          // step={field.step}
          // placeholder={String(field.placeholder || defaultValue)}
          onChange={(e) => {
            onChange({
              type: "number",
              value: parseInt(e.currentTarget.value),
            });
          }}
          // units={(args[field.unitsField || ""] || field.unitsDefault) as UnitType}
          // unitsAllowed={field.unitsAllowed}
          // onChangeUnits={onChangeUnits}
        />
      </ValueWrapper>
    );
  }
  if (value.type === "variable") {
    input = (
      <ValueWrapper
        hover={isHovered}
        onMouseOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(true);
        }}
        onMouseOut={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <VariableSelect
          id={name}
          name={name}
          entityId={entityId}
          value={value.value}
          onChange={(newValue) => {
            onChange({
              type: "variable",
              value: newValue,
            });
          }}
        />
      </ValueWrapper>
    );
  }
  if (value.type === "add") {
    input = (
      <FunctionWrapper
        hover={isHovered}
        onMouseOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(true);
        }}
        onMouseOut={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <ValueSelect
          name={`${name}_valueA`}
          entityId={entityId}
          value={value.valueA}
          onChange={(newValue) => {
            onChange({
              ...value,
              valueA: newValue,
            });
          }}
          innerValue
        />
        <OperatorWrapper>+</OperatorWrapper>
        <ValueSelect
          name={`${name}_valueB`}
          entityId={entityId}
          value={value.valueB}
          onChange={(newValue) => {
            onChange({
              ...value,
              valueB: newValue,
            });
          }}
          innerValue
        />
      </FunctionWrapper>
    );
  }

  if (innerValue) {
    return input;
  }

  return <Wrapper>{input}</Wrapper>;
};

export default ValueSelect;
