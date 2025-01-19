import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createFileRoute } from '@tanstack/react-router';
const Home = () => {
  const { toast } = useToast();
  return (
    <div className="text-red-400">
      Welcome to the Home Page
      <div>
        <Button
          onClick={() => {
            toast({
              title: 'This is title',
              description: 'This is description',
              variant: 'success',
            });
          }}
        >
          Click me
        </Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
