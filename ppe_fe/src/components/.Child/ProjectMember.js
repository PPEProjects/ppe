import React, { Component } from "react";
import { withTranslation } from "react-i18next";
class ProjectMember extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { project, users } = this.props;
    let members = project?.members ?? {};
    let { t } = this.props;
    return (
      
      <section className="">
       
        { Object.keys(project.members ?? {}).length !==0 && 
        <div className="flex items-center bg-gray-100 px-3 py-2">
           {Object.entries(members).map(([user_id, value], key) => (
          <React.Fragment key={key}>
            {key <= 4 && (
              <figure className="-ml-2" key={key}>
                <div className="w-10 border-white border-2 rounded-full overflow-hidden">
                  <div className="pb-1x1 relative  bg-gray-300 border-white border-2 rounded-full overflow-hidden">
                    <img
                      alt=""
                      src={users[user_id]?.image}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </figure>
              
            )}
          </React.Fragment>
          
        ))}
         <button
          type="button"
          className="bg-white text-yellow-600 h-10 lg:w-32 w-10 rounded-full -ml-3 z-10 border-2 border-yellow-300"
        >
          <span className="">+{members.length}</span>
          <span className="lg:inline hidden"> {t("members")}</span>
        </button>
        </div>
       
    }
     { Object.keys(project.members ?? {}).length ===0 && 
        <button
          type="button"
          className=" text-yellow-600 h-14 lg:w-32 w-10 rounded-full -ml-3 z-10"
        >
          
        </button>
    }
      </section>
    );
  }
}
export default withTranslation()(ProjectMember);
