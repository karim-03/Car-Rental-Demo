using Microsoft.EntityFrameworkCore;
using MyApi.Models;


namespace MyApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        // Initialize DbSet properties (tables in the database)
        public DbSet<CarType> CarTypes => Set<CarType>();
        public DbSet<Order> Orders => Set<Order>();

        // Override table names 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarType>().ToTable("RentalCarTypes");
            modelBuilder.Entity<Order>().ToTable("RentalOrders");

            base.OnModelCreating(modelBuilder);
        }
    }
}
