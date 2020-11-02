using Microsoft.EntityFrameworkCore;

namespace CRUD2020.Models
{
    public partial class TalentContext : DbContext
    {
        public TalentContext()
        {
        }

        public TalentContext(DbContextOptions<TalentContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Sales> Sales { get; set; }
        public virtual DbSet<Store> Store { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LAPTOP-ITAED5GQ; Database=Talent; Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            });

            modelBuilder.Entity<Sales>(entity =>
            {
                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Sales_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Sales_Product");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Sales_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
