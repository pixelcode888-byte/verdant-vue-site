CREATE TABLE public.devis_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  ville TEXT NOT NULL,
  prestation TEXT NOT NULL,
  message TEXT,
  statut TEXT NOT NULL DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.devis_requests TO anon;
GRANT ALL ON public.devis_requests TO service_role;

ALTER TABLE public.devis_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visiteurs peuvent envoyer une demande de devis"
  ON public.devis_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);