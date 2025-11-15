import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import ProjectSummaryCard from "@/components/ProjectSummaryCard";
import MainClock from "@/components/MainClock";
import ProfileCard from "@/components/ProfileCard";
import AddTaskButton from "@/components/AddTaskButton";
import DailyTaskTimeline from "@/components/DailyTaskTimeline";
import AddTaskModal from "@/components/AddTaskModal";
import CreateProjectModal from "@/components/CreateProjectModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Define o schema para as tarefas para reutilização
const taskSchema = z.object({
  project: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  cameraDetect: z.boolean().default(false),
  blockSocialSites: z.boolean().default(false),
});

type Task = z.infer<typeof taskSchema> & { id: string; projectColor: string; status?: "OK" | "Pending" | "Missed" };

interface Project {
  id: string;
  name: string;
  totalTime: string; // Para exibição, ex: "14h"
  color: string; // Classe de cor do Tailwind
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [projects, setProjects] = useState<Project[]>([
    { id: "llm", name: "Projeto LLM", totalTime: "14h", color: "bg-dashboard-project-purple" },
    { id: "invest", name: "Aprender a investir", totalTime: "9h", color: "bg-dashboard-project-green" },
    { id: "german", name: "Estudar alemão", totalTime: "3h", color: "bg-dashboard-project-orange" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      time: "8h - 10h30m",
      description: "Correção dos embeddings",
      status: "OK",
      project: "llm",
      projectColor: "bg-dashboard-project-purple",
      startTime: "08:00",
      endTime: "10:30",
    },
    {
      id: "2",
      time: "18h - 19h",
      description: "Revisar documentação",
      status: "Pending",
      project: "invest",
      projectColor: "bg-dashboard-project-green",
      cameraDetect: true,
      blockSocialSites: true,
      startTime: "18:00",
      endTime: "19:00",
    },
  ]);

  const handleCreateProject = (newProjectData: { name: string; color: string }) => {
    const newProject: Project = {
      id: newProjectData.name.toLowerCase().replace(/\s/g, "-") + "-" + Date.now(),
      name: newProjectData.name,
      totalTime: "0h",
      color: newProjectData.color,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    setProjectToDelete(project);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectToDelete.id));
      setTasks((prevTasks) => prevTasks.filter((t) => t.project !== projectToDelete.id)); // Remove tarefas associadas
      toast.success(`Projeto "${projectToDelete.name}" excluído com sucesso!`);
      setProjectToDelete(null);
    }
  };

  const handleAddTask = (newTaskData: z.infer<typeof taskSchema>) => {
    const project = projects.find(p => p.id === newTaskData.project);
    if (project) {
      const newTask: Task = {
        id: String(tasks.length + 1) + "-" + Date.now(),
        time: `${newTaskData.startTime} - ${newTaskData.endTime}`,
        description: newTaskData.description,
        status: "Pending",
        project: newTaskData.project,
        projectColor: project.color,
        cameraDetect: newTaskData.cameraDetect,
        blockSocialSites: newTaskData.blockSocialSites,
        startTime: newTaskData.startTime,
        endTime: newTaskData.endTime,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setTaskToDelete(task);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskToDelete.id));
      toast.success(`Tarefa "${taskToDelete.description}" excluída com sucesso!`);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-4 gap-6 bg-dashboard-background font-sans text-dashboard-text-primary">
      {/* Coluna da Esquerda (Visão Geral) */}
      <div className="lg:w-[40%] flex flex-col space-y-6">
        <div className="mb-6">
          <img src="/gopher-logo.png" alt="Gopher Logo" className="h-16 w-auto mb-4" />
        </div>
        <MonthlyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {projects.map((project) => (
            <ProjectSummaryCard
              key={project.id}
              projectName={project.name}
              totalTime={project.totalTime}
              color={project.color}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
          <Button
            onClick={() => setIsCreateProjectModalOpen(true)}
            className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center space-x-2 py-6 rounded-lg shadow-sm"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Criar Novo Projeto</span>
          </Button>
        </div>
      </div>

      {/* Coluna da Direita (Ação Diária) */}
      <div className="lg:w-[60%] flex flex-col space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <MainClock progress={30} progressColor="text-dashboard-project-purple" />
          <div className="flex flex-col items-end space-y-2">
            <span className="text-lg font-semibold capitalize">
              {format(selectedDate, "d MMMM, yyyy", { locale: ptBR })}
            </span>
            <div className="flex space-x-4">
              <ProfileCard />
              <AddTaskButton onClick={() => setIsAddTaskModalOpen(true)} />
            </div>
          </div>
        </div>
        <DailyTaskTimeline tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        projects={projects}
      />
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {/* Diálogo de Confirmação de Exclusão de Projeto */}
      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão de Projeto</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir o projeto "
              {projectToDelete?.name}"? Todas as tarefas e o tempo registrado serão perdidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Confirmação de Exclusão de Tarefa */}
      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão de Tarefa</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir a tarefa "
              {taskToDelete?.description}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTask} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MadeWithDyad />
    </div>
  );
};

export default Index;