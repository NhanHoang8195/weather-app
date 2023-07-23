"use client";

import React, { useCallback } from "react";
import Widget from "src/components/widget/Widget";
import { IWidget } from "src/models/Wiget.model";
import useHomeStore, { IHomeStore } from "src/zustand-store/Home.store";
import useHome from "../../Home.action";
import { DragDropContext, Droppable, Draggable, DropResult, Direction } from "react-beautiful-dnd";
import useResize from "src/hooks/useResizeContainer";

function reorderItem<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
function removeItem(list: IWidget[], id: string | number): IWidget[] {
  return list.filter((item) => item.location.lat !== id);
}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgray",
  padding: grid,
});

function WidgetContainer() {
  const {
    widgets: draggableWidgets,
    selectedWidget,
    replaceWidgets,
  } = useHomeStore((state: IHomeStore) => ({
    widgets: state.widgets || [],
    selectedWidget: (state.selectedWidget || {}) as IWidget,
    updateWidget: state.updateWidget,
    replaceWidgets: state.replaceWidgets,
  }));

  const { containerWidth, containerRef } = useResize();
  const { handleChangeWidget } = useHome();

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const widgetsUpdated = reorderItem(draggableWidgets, result.source.index, result.destination.index);
    replaceWidgets(widgetsUpdated);
  }
  const directionMode: Direction = containerWidth >= 640 ? "horizontal" : "vertical";
  const onRemoveWidget = useCallback(
    (widget: IWidget) => {
      const widgetsUpdated = removeItem(draggableWidgets, widget.location.lat);
      replaceWidgets(widgetsUpdated);
    },
    [draggableWidgets]
  );

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
                          isActive={widget.location.lat === selectedWidget.location?.lat}
                          onRemoveWidget={onRemoveWidget}
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
