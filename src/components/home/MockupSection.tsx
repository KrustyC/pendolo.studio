const MockupSection = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative w-full aspect-[16/9] bg-secondary border border-border overflow-hidden">
          {/* Laptop mockup frame */}
          <div className="absolute inset-4 md:inset-8 lg:inset-12 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {/* Laptop body */}
              <div className="bg-card border border-border rounded-t-sm overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="h-5 bg-secondary rounded-sm max-w-md mx-auto" />
                  </div>
                </div>
                {/* Screen content */}
                <div className="aspect-[16/10] bg-secondary flex items-center justify-center">
                  <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-muted-foreground/30">
                    MOCKUP
                  </span>
                </div>
              </div>
              {/* Laptop base */}
              <div className="h-3 md:h-4 bg-card border-x border-b border-border rounded-b-sm" />
              <div className="h-1.5 md:h-2 bg-card/50 border border-border mx-[15%] rounded-b-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupSection;
