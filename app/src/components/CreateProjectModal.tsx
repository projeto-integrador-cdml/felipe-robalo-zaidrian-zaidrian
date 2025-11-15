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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "O nome do projeto é obrigatório"),
  color: z.string().min(1, "Selecione uma cor para o projeto"),
});

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: z.infer<typeof formSchema>) => void;
}

const projectColors = [
  { id: "purple", name: "Roxo", class: "bg-dashboard-project-purple" },
  { id: "green", name: "Verde", class: "bg-dashboard-project-green" },
  { id: "orange", name: "Laranja", class: "bg-dashboard-project-orange" },
];

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreateProject }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onCreateProject(values);
    form.reset();
    onClose();
    toast.success("Projeto criado com sucesso!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-dashboard-text-primary">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo projeto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Projeto de IA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor de Identificação</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectColors.map((colorOption) => (
                        <SelectItem key={colorOption.id} value={colorOption.class}>
                          <div className="flex items-center">
                            <span className={`w-4 h-4 rounded-full mr-2 ${colorOption.class}`}></span>
                            {colorOption.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-dashboard-highlight-red hover:bg-dashboard-highlight-red/90 text-white">
              Criar Projeto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;