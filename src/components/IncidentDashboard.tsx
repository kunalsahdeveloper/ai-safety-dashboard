import React, { useState } from 'react';
import { Incident, Severity, mockIncidents } from '../types/incident';
import './IncidentDashboard.css';

type SortOrder = 'newest' | 'oldest';
type FilterSeverity = Severity | 'All';

const IncidentDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [filterSeverity, setFilterSeverity] = useState<FilterSeverity>('All');
  const [expandedIncidentId, setExpandedIncidentId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'Medium' as Severity
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: ''
  });

  const handleSort = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handleFilter = (severity: FilterSeverity) => {
    setFilterSeverity(severity);
  };

  const toggleIncidentDetails = (id: number) => {
    setExpandedIncidentId(expandedIncidentId === id ? null : id);
  };

  const validateForm = () => {
    const errors = {
      title: '',
      description: ''
    };
    let isValid = true;

    if (!newIncident.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }
    if (!newIncident.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newIncidentData: Incident = {
      id: incidents.length + 1,
      ...newIncident,
      reported_at: new Date().toISOString()
    };

    setIncidents(prev => [...prev, newIncidentData]);
    setNewIncident({ title: '', description: '', severity: 'Medium' });
    setShowForm(false);
    setFormErrors({ title: '', description: '' });
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => filterSeverity === 'All' || incident.severity === filterSeverity)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>AI Safety Dashboard</h1>
        </div>
        <div className="navbar-links">
          <button className="nav-button active">Dashboard</button>
          <button className="nav-button">Analytics</button>
          <button className="nav-button">Settings</button>
        </div>
        <div className="navbar-actions">
          <button className="report-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Report New Incident'}
          </button>
        </div>
      </nav>

      <div className="controls">
        <div className="filter-controls">
          <h3>Filter by Severity:</h3>
          <div>
            <button 
              className={filterSeverity === 'All' ? 'active' : ''} 
              onClick={() => handleFilter('All')}
            >
              All
            </button>
            <button 
              className={filterSeverity === 'Low' ? 'active' : ''} 
              onClick={() => handleFilter('Low')}
            >
              Low
            </button>
            <button 
              className={filterSeverity === 'Medium' ? 'active' : ''} 
              onClick={() => handleFilter('Medium')}
            >
              Medium
            </button>
            <button 
              className={filterSeverity === 'High' ? 'active' : ''} 
              onClick={() => handleFilter('High')}
            >
              High
            </button>
          </div>
        </div>

        <div className="sort-controls">
          <h3>Sort by Date:</h3>
          <div>
            <button 
              className={sortOrder === 'newest' ? 'active' : ''} 
              onClick={() => handleSort('newest')}
            >
              Newest First
            </button>
            <button 
              className={sortOrder === 'oldest' ? 'active' : ''} 
              onClick={() => handleSort('oldest')}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <form className="incident-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newIncident.title}
              onChange={handleInputChange}
              className={formErrors.title ? 'error' : ''}
              placeholder="Enter incident title"
            />
            {formErrors.title && <span className="error-message">{formErrors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newIncident.description}
              onChange={handleInputChange}
              className={formErrors.description ? 'error' : ''}
              placeholder="Enter incident description"
            />
            {formErrors.description && <span className="error-message">{formErrors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="severity">Severity:</label>
            <select
              id="severity"
              name="severity"
              value={newIncident.severity}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit Incident</button>
        </form>
      )}

      <div className="incidents-list">
        <table className="incident-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Severity</th>
              <th>Date</th>
              <th className="incident-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedIncidents.map(incident => (
              <React.Fragment key={incident.id}>
                <tr>
                  <td>{incident.title}</td>
                  <td>
                    <span className={`incident-severity ${incident.severity.toLowerCase()}`}>{incident.severity}</span>
                  </td>
                  <td className="incident-date">{new Date(incident.reported_at).toLocaleDateString()}</td>
                  <td className="incident-actions">
                    <button
                      className="incident-view-details"
                      onClick={() => toggleIncidentDetails(incident.id)}
                    >
                      {expandedIncidentId === incident.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </td>
                </tr>
                {expandedIncidentId === incident.id && (
                  <tr className="incident-details-row">
                    <td colSpan={4}>
                      {incident.description}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentDashboard; 