using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace SyriaShomoos.Entities
{
  public class BranchSource : FullAuditedAggregateRoot<Guid>
  {
    public string UserId { get; set; }
    public string BranchCode { get; set; }
    public string BranchName { get; set; }
    public string City { get; set; }
  }
}
