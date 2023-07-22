"use client";

import React, { useMemo, useState } from "react";
import Widget from "src/components/widget/Widget";
import { IWidget } from "src/models/Wiget.model";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import useHome from "../../Home.action";

const WidgetContainer = () => {
  const { widgets, selectedWidget } = useHomeStore((state: IHomeStore) => ({
    widgets: state.widgets || [],
    selectedWidget: (state.selectedWidget || {}) as IWidget,
  }));
  const { handleChangeWidget } = useHome();

  if (widgets.length === 0) {
    return null;
  }
  return (
    <div className="grid gap-4 md:grid-cols-4 mt-4 min-h-[200px]">
      {widgets.map((widget: IWidget) => (
        <Widget
          onSelectWidget={handleChangeWidget}
          key={widget.location.lat}
          isActive={widget.location.lat === selectedWidget.location.lat}
          {...widget}
        />
      ))}
    </div>
  );
};

export default WidgetContainer;
