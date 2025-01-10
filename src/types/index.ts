// Entity Types
export interface FunctionGroup {
  id: string;
  name: string;
}

export interface Function {
  id: string;
  name: string;
  function_group_id: string;
  parent_id: string | null;
}

export interface Scenario {
  id: string;
  name: string;
  scenario_logic: string;
}

export interface ScenarioLogic {
  id: string;
  name: string;
  scenario_id: string;
}

export interface MasterKPI {
  id: string;
  name: string;
}

export interface KPI {
  id: string;
  name: string;
  master_kpi_id: string;
}

export interface KPIModel {
  id: string;
  name: string;
}

export interface KPIModelNode {
  id: string;
  name: string;
  parent_id: string | null;
  kpi_id: string;
  kpi_model_id: string;
}

export interface KPIModelNodeLogic {
  id: string;
  scenario_logic_id: string;
  input_type: string;
  formulas: string;
  kpi_model_node_id: string;
}

export interface Deal {
  id: string;
  name: string;
  scenario_id: string;
  kpi_id: string;
  value: number;
  period: string;
}

export interface DealFunction {
  id: string;
  deal_id: string;
  function_id: string;
}