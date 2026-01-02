using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;
using MyApi.DTOs;


namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL (with optional filter)
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] DateOnly? fromDate)
        {
            var query = _context.Orders
                .Include(o => o.CarType)
                .AsQueryable();

            if (fromDate.HasValue)
                query = query.Where(o => o.FromDate >= fromDate.Value);

            return Ok(await query.ToListAsync());
        }

        // CREATE
        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            var order = new Order
            {
                CarTypeId = dto.CarTypeId,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
                Username = dto.Username,
                MobileNumber = dto.MobileNumber,
                Comments = dto.Comments
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateOrderDto dto)
        {
            var order = await _context.Orders
                .Include(o => o.CarType)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            order.CarTypeId = dto.CarTypeId;
            order.FromDate = dto.FromDate;
            order.ToDate = dto.ToDate;
            order.Username = dto.Username;
            order.MobileNumber = dto.MobileNumber;
            order.Comments = dto.Comments;

            await _context.SaveChangesAsync();

            await _context.Entry(order)
                .Reference(o => o.CarType)
                .LoadAsync();

            return Ok(order);
        }
    }

}


