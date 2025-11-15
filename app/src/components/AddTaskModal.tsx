import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription, // Adicionado aqui
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  project: z.string().min(1, "Selecione um projeto"),
  description: z.string().min(1, "A descrição da tarefa é obrigatória"),
  startTime: z.string().min(1, "Horário de início é obrigatório"),
  endTime: z.string().min(1, "Horário de término é obrigatório"),
  cameraDetect: z.boolean().default(false),
  blockSocialSites: z.boolean().default(false),
});

interface ProjectOption {
  id: string;
  name: string;
  color: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: z.infer<typeof formSchema>) => void;
  projects: ProjectOption[]; // Nova prop para a lista de projetos
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask, projects }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
      description: "",
      startTime: "",
      endTime: "",
      cameraDetect: false,
      blockSocialSites: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddTask(values);
    form.reset();
    onClose();
    toast.success("Tarefa adicionada com sucesso!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-dashboard-text-primary">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para agendar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projeto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um projeto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Tarefa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Correção dos embeddings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Término</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cameraDetect"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Detecção facial (Camera detect)
                    </FormLabel>
                    <FormDescription>
                      Ativar detecção de câmera para monitoramento de foco.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blockSocialSites"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Bloquear redes sociais
                    </FormLabel>
                    <FormDescription>
                      Bloquear acesso a sites de redes sociais durante a tarefa.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-dashboard-highlight-red hover:bg-dashboard-highlight-red/90 text-white">
              Adicionar Tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;