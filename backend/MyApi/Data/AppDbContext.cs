using Microsoft.EntityFrameworkCore;
using MyApi.Models;
using MyApi.DTOs;


namespace MyApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<CarType> CarTypes => Set<CarType>();
        public DbSet<Order> Orders => Set<Order>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarType>().ToTable("RentalCarTypes");
            modelBuilder.Entity<Order>().ToTable("RentalOrders");

            base.OnModelCreating(modelBuilder);
        }
    }
}
