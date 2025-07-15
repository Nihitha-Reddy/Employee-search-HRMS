import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./ConfigPanel.css";

const ConfigPanel = ({ onClose, columnsConfig, onSave }) => {
  const [localConfig, setLocalConfig] = useState([]);

  useEffect(() => {
    setLocalConfig(columnsConfig);
  }, [columnsConfig]);

  const toggleVisibility = (index) => {
    const updated = [...localConfig];
    updated[index].visible = !updated[index].visible;
    setLocalConfig(updated);
  };

  const   handleSave = () => {
    onSave(localConfig);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = Array.from(localConfig);
    const [removed] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, removed);

    setLocalConfig(updated);
  };

  return (
    <div className="config-side-backdrop">
      <div className="config-side-panel">
        <div className="config-header">
          <h2>Configure Columns</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <p className="subtext">Reorder and toggle column visibility below:</p>

        <div className="config-list">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {localConfig.map((col, idx) => (
                    <Draggable key={col.key} draggableId={col.key} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="config-item"
                        >
                          <span className="drag-handle" {...provided.dragHandleProps}>☰</span>
                          <label>
                            <input
                              type="checkbox"
                              checked={col.visible}
                              onChange={() => toggleVisibility(idx)}
                            />
                            <span>{col.label}</span>
                          </label>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="config-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
