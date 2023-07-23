"use client";

import React, { useRef, useEffect, useState } from "react";
import Widget from "src/components/widget/Widget";
import { IWidget } from "src/models/Wiget.model";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import useHome from "../../Home.action";
import { DragDropContext, Droppable, Draggable, DropResult, Direction } from "react-beautiful-dnd";
import useResize from "src/hooks/useResizeContainer";
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;
const DRROPPABLE_ID = "droppable-container";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgray",
  padding: grid,
});

function WidgetContainer() {
  const { widgets, selectedWidget } = useHomeStore((state: IHomeStore) => ({
    widgets: state.widgets || [],
    selectedWidget: (state.selectedWidget || {}) as IWidget,
    updateWidget: state.updateWidget,
  }));

  const { containerWidth, containerRef } = useResize();
  const { handleChangeWidget } = useHome();
  const [draggableWidgets, setDraggleWidgets] = useState<IWidget[]>([]);
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const widgetsUpdated = reorder(draggableWidgets, result.source.index, result.destination.index);
    setDraggleWidgets(widgetsUpdated);
  }
  const directionMode: Direction = containerWidth >= 640 ? "horizontal" : "vertical";
  useEffect(() => {
    setDraggleWidgets(widgets);
  }, [widgets]);

  if (draggableWidgets.length === 0) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div ref={containerRef}>
        <Droppable droppableId="droppable" direction={directionMode}>
          {(provided, snapshot) => {
            return (
              <div
                id={DRROPPABLE_ID}
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 mt-4"
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {draggableWidgets.map((widget, index) => (
                  <Draggable key={widget.location.lat} draggableId={String(widget.location.lat)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <Widget
                          onSelectWidget={handleChangeWidget}
                          key={widget.location.lat}
                          isActive={widget.location.lat === selectedWidget.location.lat}
                          {...widget}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
export default WidgetContainer;
