using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;


namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/cartypes")]
    public class CarTypesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarTypesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.CarTypes.ToListAsync());
        }
    }

}

