import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import JobCard from './JobCard';
import './KanbanBoard.css';

function KanbanBoard({ jobs, onDragEnd, onJobClick, onDeleteJob }) {
  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return '#667eea';
      case 'Interview':
        return '#ff9800';
      case 'Offer':
        return '#4caf50';
      case 'Rejected':
        return '#f44336';
      default:
        return '#999';
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {statuses.map(status => {
          const statusJobs = getJobsByStatus(status);
          return (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  className={`kanban-column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    borderTopColor: getStatusColor(status),
                  }}
                >
                  <div className="column-header">
                    <h3 style={{ color: getStatusColor(status) }}>{status}</h3>
                    <span className="job-count">{statusJobs.length}</span>
                  </div>

                  <div className="cards-container">
                    {statusJobs.map((job, index) => (
                      <Draggable key={job._id} draggableId={job._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <JobCard
                              job={job}
                              onClick={() => onJobClick(job)}
                              onDelete={() => onDeleteJob(job._id)}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>

                  {statusJobs.length === 0 && (
                    <div className="empty-state">
                      <span>No applications yet</span>
                      <small>Start tracking your first job 🚀</small>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
